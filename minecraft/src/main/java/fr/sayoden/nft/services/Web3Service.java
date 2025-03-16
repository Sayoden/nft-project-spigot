package fr.sayoden.nft.services;

import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.dto.ListedNFTData;
import fr.sayoden.nft.dto.NFTData;
import lombok.Getter;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.*;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.util.*;

public class Web3Service {

    /**
     * Player address -> (Token ID, Item Base64)
     */
    @Getter
    private static final Map<String, List<NFTData>> nfts = new HashMap<>();

    private final MarketPlacePlugin plugin;
    private Credentials credentials;

    public Web3Service(MarketPlacePlugin plugin) {
        this.plugin = plugin;
        this.credentials = Credentials.create("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    }

    public void setCredentials(final String privateKey) {
        this.credentials = Credentials.create(privateKey);
    }

    public String sendTransactionWithValue(String senderAddress, Function function, BigInteger value) throws Exception {
        String encodedFunction = FunctionEncoder.encode(function);

        BigInteger nonce = this.plugin.getWeb3j().ethGetTransactionCount(
                senderAddress, DefaultBlockParameterName.PENDING
        ).send().getTransactionCount();

        RawTransaction rawTransaction = RawTransaction.createTransaction(
                nonce,
                DefaultGasProvider.GAS_PRICE,
                DefaultGasProvider.GAS_LIMIT,
                MarketPlacePlugin.getMarketplaceContractAddress(),
                value,
                encodedFunction
        );

        byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
        String hexValue = Numeric.toHexString(signedMessage);

        EthSendTransaction transactionResponse = this.plugin.getWeb3j().ethSendRawTransaction(hexValue).send();

        if (transactionResponse.hasError()) {
            throw new RuntimeException("Transaction Error: " + transactionResponse.getError().getMessage());
        }

        return transactionResponse.getTransactionHash();
    }

    public String sendTransaction(String senderAddress, Function function) throws Exception {
        String encodedFunction = FunctionEncoder.encode(function);

        BigInteger nonce = this.plugin.getWeb3j().ethGetTransactionCount(
                senderAddress, DefaultBlockParameterName.PENDING
        ).send().getTransactionCount();

        RawTransaction rawTransaction = RawTransaction.createTransaction(
                nonce,
                DefaultGasProvider.GAS_PRICE,
                DefaultGasProvider.GAS_LIMIT,
                MarketPlacePlugin.getMarketplaceContractAddress(),
                BigInteger.ZERO,
                encodedFunction
        );

        byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
        String hexValue = Numeric.toHexString(signedMessage);

        EthSendTransaction transactionResponse = this.plugin.getWeb3j().ethSendRawTransaction(hexValue).send();

        if (transactionResponse.hasError()) {
            throw new RuntimeException("Transaction Error: " + transactionResponse.getError().getMessage());
        }

        return transactionResponse.getTransactionHash();
    }

    public void listNFT(String playerAddress, long tokenId, long price) {
        try {
            Function function = new Function(
                    "listNFT",
                    Arrays.asList(new Uint256(tokenId), new Uint256(price)),
                    Collections.emptyList()
            );

            String txHash = sendTransaction(playerAddress, function);
            System.out.println("✅ NFT " + tokenId + " mis en vente pour " + price + " wei, Tx: " + txHash);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String mintNFT(String playerAddress, String itemBase64) {
        try {
            Function function = new Function(
                    "mintNFT",
                    List.of(new Address(playerAddress)),
                    Collections.emptyList()
            );
            String encodedFunction = FunctionEncoder.encode(function);

            String contractAddress = MarketPlacePlugin.getMarketplaceContractAddress();
            BigInteger nonce = this.plugin.getWeb3j().ethGetTransactionCount(
                    credentials.getAddress(),
                    DefaultBlockParameterName.PENDING
            ).send().getTransactionCount();

            RawTransaction transaction = RawTransaction.createTransaction(
                    nonce,
                    DefaultGasProvider.GAS_PRICE,
                    DefaultGasProvider.GAS_LIMIT,
                    contractAddress,
                    BigInteger.ZERO,
                    encodedFunction
            );

            byte[] signedMessage = TransactionEncoder.signMessage(transaction, credentials);
            String hexValue = Numeric.toHexString(signedMessage);

            EthSendTransaction response = this.plugin.getWeb3j().ethSendRawTransaction(hexValue).send();

            if (response.hasError()) {
                System.err.println("Transaction Error: " + response.getError().getMessage());
                return null;
            }

            String transactionHash = response.getTransactionHash();
            System.out.println("Transaction Hash: " + transactionHash);

            return getTokenIdFromTransaction(transactionHash, playerAddress, itemBase64);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getTokenIdFromTransaction(String transactionHash, String playerAddress, String itemBase64) throws Exception {
        EthGetTransactionReceipt transactionReceipt = null;
        int attempts = 0;

        while (attempts < 10) {
            transactionReceipt = this.plugin.getWeb3j().ethGetTransactionReceipt(transactionHash).send();
            if (transactionReceipt.getTransactionReceipt().isPresent()) {
                break;
            }
            Thread.sleep(2000);
            attempts++;
        }

        if (transactionReceipt == null || transactionReceipt.getTransactionReceipt().isEmpty()) {
            System.err.println("Transaction receipt not found.");
            return null;
        }

        List<Log> logs = transactionReceipt.getTransactionReceipt().get().getLogs();
        for (Log log : logs) {
            Event event = new Event("NFTMinted",
                    Arrays.asList(new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {})
            );

            List<Type> eventValues = FunctionReturnDecoder.decode(log.getData(), event.getNonIndexedParameters());
            
            if (!eventValues.isEmpty()) {
                BigInteger tokenId = (BigInteger) eventValues.getFirst().getValue();
                System.out.println("Minted NFT Token ID: " + tokenId.toString() + " for player: " + playerAddress);
                nfts.putIfAbsent(playerAddress.toLowerCase(), new ArrayList<>());
                nfts.get(playerAddress.toLowerCase()).add(new NFTData(tokenId.toString(), itemBase64));
                DatabaseService.saveNFT(tokenId.toString(), itemBase64, playerAddress);
                return tokenId.toString();
            }
        }

        System.err.println("Token ID not found in transaction logs.");
        return null;
    }

    public List<ListedNFTData> getAllListedNFTs() {
        try {
            Function function = new Function(
                    "getAllListedNFTs",
                    Collections.emptyList(),
                    Arrays.asList(
                            new TypeReference<DynamicArray<Uint256>>() {},
                            new TypeReference<DynamicArray<Address>>() {},
                            new TypeReference<DynamicArray<Uint256>>() {}
                    )
            );

            String encodedFunction = FunctionEncoder.encode(function);

            EthCall response = this.plugin.getWeb3j().ethCall(
                    Transaction.createEthCallTransaction(
                            credentials.getAddress(),
                            MarketPlacePlugin.getMarketplaceContractAddress(),
                            encodedFunction
                    ),
                    DefaultBlockParameterName.LATEST
            ).send();

            if (response.hasError()) {
                System.err.println("Erreur Web3j: " + response.getError().getMessage());
                return Collections.emptyList();
            }

            List<Type> decodedResponse = FunctionReturnDecoder.decode(response.getValue(), function.getOutputParameters());

            List<BigInteger> tokenIds = ((DynamicArray<Uint256>) decodedResponse.get(0))
                    .getValue()
                    .stream()
                    .map(Uint256::getValue)
                    .toList();

            List<String> sellers = ((DynamicArray<Address>) decodedResponse.get(1))
                    .getValue()
                    .stream()
                    .map(Address::toString)
                    .toList();

            List<BigInteger> prices = ((DynamicArray<Uint256>) decodedResponse.get(2))
                    .getValue()
                    .stream()
                    .map(Uint256::getValue)
                    .toList();

            List<ListedNFTData> listedNFTs = new ArrayList<>();
            for (int i = 0; i < tokenIds.size(); i++) {
                listedNFTs.add(new ListedNFTData(
                        tokenIds.get(i),
                        sellers.get(i),
                        prices.get(i)
                ));
            }

            return listedNFTs;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


}
