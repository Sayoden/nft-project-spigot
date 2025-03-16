package fr.sayoden.nft.listeners;

import dev.s7a.base64.Base64ItemStack;
import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.services.Web3Service;
import org.bukkit.Material;
import org.bukkit.Sound;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.ItemStack;

public class PlayerClickListener implements Listener {

    @EventHandler
    public void onPlayerClick(PlayerInteractEvent event) {
        if (event.getClickedBlock() == null) {
            return;
        }

        Player player = event.getPlayer();
        String playerAddress = MarketPlacePlugin.getInstance().getPlayerService().getPlayerAddress();

        if (event.getClickedBlock().getType().equals(Material.CAULDRON)) {
            event.setCancelled(true);

            MarketPlacePlugin.getInstance().getWeb3Service()
                    .mintNFT(playerAddress, Base64ItemStack.encode(player.getInventory().getItemInHand()));
            player.getInventory().setItemInHand(new ItemStack(Material.AIR));
            player.sendMessage("§aVotre NFT a été mint avec succès !");
        } else if (event.getClickedBlock().getType().equals(Material.BEACON)) {
            event.setCancelled(true);
            String base64 = Base64ItemStack.encode(player.getInventory().getItemInHand());

            if (!Web3Service.getNfts().get(playerAddress.toLowerCase()).stream().anyMatch(nftData -> {
                player.getInventory().setItemInHand(new ItemStack(Material.AIR));
                if (nftData.itemBase64().equals(base64)) {
                    MarketPlacePlugin.getInstance().getWeb3Service().listNFT(playerAddress, Long.parseLong(nftData.tokenId()), 1L);
                    player.sendMessage("§aVotre NFT a été mis en vente pour 1ETH !");
                    return true;
                }
                return false;
            })) {
                player.sendMessage("§cVous ne possédez pas cet NFT !");
            }
        }
    }

}
