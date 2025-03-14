package fr.sayoden.nft.services;

import fr.sayoden.nft.MarketPlacePlugin;
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
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.util.*;

public class Web3Service {

    @Getter
    private static final Map<String, String> nfts = new HashMap<>();

    private final MarketPlacePlugin plugin;
    private final Credentials credentials;

    public Web3Service(MarketPlacePlugin plugin) {
        this.plugin = plugin;
        this.credentials = Credentials.create("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
    }

    public String mintNFT(String playerAddress, String itemBase64) {
        try {
            Function function = new Function(
                    "mintNFT",
                    List.of(new Address(playerAddress)),
                    Collections.emptyList()
            );
            String encodedFunction = FunctionEncoder.encode(function);

            String contractAddress = MarketPlacePlugin.getMARKETPLACE_CONTRACT_ADDRESS();
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

            return getTokenIdFromTransaction(transactionHash, contractAddress, itemBase64);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String getTokenIdFromTransaction(String transactionHash, String contractAddress, String itemBase64) throws Exception {
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
                System.out.println("Minted NFT Token ID: " + tokenId);
                nfts.put(tokenId.toString(), itemBase64);
                DatabaseService.saveNFT(tokenId.toString(), itemBase64);
                return tokenId.toString();
            }
        }

        System.err.println("Token ID not found in transaction logs.");
        return null;
    }


}
