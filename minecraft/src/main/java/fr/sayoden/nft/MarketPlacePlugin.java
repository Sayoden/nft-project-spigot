package fr.sayoden.nft;

import fr.sayoden.nft.listeners.PlayerJoinListener;
import org.bukkit.plugin.java.JavaPlugin;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.util.Collections;
import java.util.List;

public final class MarketPlacePlugin extends JavaPlugin {

    private static final String CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    private static final String PRIVATE_KEY = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    private Web3j web3j;

    @Override
    public void onEnable() {
        this.web3j = Web3j.build(new HttpService("http://host.docker.internal:8545"));

        try {
            getLogger().info("Web3j version: " + web3j.web3ClientVersion().send().getWeb3ClientVersion());
        } catch (Exception e) {
            e.printStackTrace();
        }

        callContractMethod();
        this.getServer().getPluginManager().registerEvents(new PlayerJoinListener(), this);
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }

    public void callContractMethod() {
        Function function = new Function(
                "getMarketplaceName",
                Collections.emptyList(),
                List.of(new TypeReference<Utf8String>() {
                })
        );

        try {
            String encodedFunction = org.web3j.abi.FunctionEncoder.encode(function);
            String response = web3j.ethCall(
                    org.web3j.protocol.core.methods.request.Transaction.createEthCallTransaction(
                            PRIVATE_KEY, CONTRACT_ADDRESS, encodedFunction
                    ),
                    org.web3j.protocol.core.DefaultBlockParameterName.LATEST
            ).send().getValue();

            String test = (String) FunctionReturnDecoder.decode(response, function.getOutputParameters()).getFirst().getValue();

            getLogger().info("Marketplace name: " + test);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
