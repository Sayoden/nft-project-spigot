package fr.sayoden.nft;

import lombok.SneakyThrows;
import org.bukkit.plugin.java.JavaPlugin;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

public final class MarketPlacePlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        Web3j web3 = Web3j.build(new HttpService("http://hardhat:8545"));

        try {
            getLogger().info("Web3j version: " + web3.web3ClientVersion().send().getWeb3ClientVersion());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
