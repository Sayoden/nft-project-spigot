package fr.sayoden.nft;

import fr.minuskube.inv.InventoryManager;
import fr.sayoden.nft.commands.NFTCommand;
import fr.sayoden.nft.listeners.PlayerClickListener;
import fr.sayoden.nft.listeners.PlayerJoinListener;
import fr.sayoden.nft.services.DatabaseService;
import fr.sayoden.nft.services.PlayerService;
import fr.sayoden.nft.services.Web3Service;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.plugin.java.JavaPlugin;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.util.Collections;
import java.util.List;

@Getter
public final class MarketPlacePlugin extends JavaPlugin {

    @Getter
    private static MarketPlacePlugin instance;

    @Getter
    @Setter
    private static String marketplaceContractAddress = "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F";

    @Getter
    private static final String MCOIN_CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    private Web3j web3j;
    private PlayerService playerService;
    private Web3Service web3Service;
    private InventoryManager inventoryManager;

    @Override
    public void onEnable() {
        instance = this;

        inventoryManager = new InventoryManager(this);
        inventoryManager.init();

        this.playerService = new PlayerService();
        this.web3j = Web3j.build(new HttpService("http://host.docker.internal:8545"));
        this.web3Service = new Web3Service(this);

        DatabaseService.initializeDatabase();

        try {
            getLogger().info("Web3j version: " + web3j.web3ClientVersion().send().getWeb3ClientVersion());
        } catch (Exception e) {
            e.printStackTrace();
        }

        this.getServer().getPluginManager().registerEvents(new PlayerJoinListener(), this);
        this.getServer().getPluginManager().registerEvents(new PlayerClickListener(), this);
        this.getCommand("nft").setExecutor(new NFTCommand());
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
                            playerService.getPlayerAddress(), marketplaceContractAddress, encodedFunction
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
