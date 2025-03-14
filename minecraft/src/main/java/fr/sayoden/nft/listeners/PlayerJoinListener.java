package fr.sayoden.nft.listeners;

import fr.sayoden.nft.MarketPlacePlugin;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class PlayerJoinListener implements Listener {

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        event.getPlayer().sendMessage("§c§lWelcome on our nft marketplace server !");
        MarketPlacePlugin.getInstance().callContractMethod();
    }
}
