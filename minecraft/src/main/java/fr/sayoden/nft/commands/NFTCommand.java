package fr.sayoden.nft.commands;

import dev.s7a.base64.Base64ItemStack;
import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.dto.NFTData;
import fr.sayoden.nft.services.Web3Service;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

public class NFTCommand implements CommandExecutor {

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String label, @NotNull String[] args) {
        if (args[0].equalsIgnoreCase("link")) {
            String playerAddress = args[1];
            MarketPlacePlugin.getInstance().getPlayerService().setPlayerAddress(playerAddress);

            sender.sendMessage("§aVos transactions sont reliées a l'adresse: §l" + playerAddress);
            return true;

        } else if (args[0].equalsIgnoreCase("mint")) {
            Player player = (Player) sender;
            String itemBase64 = Base64ItemStack.encode(player.getInventory().getItemInMainHand());
            String playerAddress = MarketPlacePlugin.getInstance().getPlayerService().getPlayerAddress();

            if (playerAddress == null) {
                sender.sendMessage("§cVous devez d'abord lier votre adresse avec /nft link <address>");
                return true;
            }

            CompletableFuture.supplyAsync(() -> {
                String transactionHash = MarketPlacePlugin.getInstance().getWeb3Service().mintNFT(playerAddress, itemBase64);
                sender.sendMessage("§aVotre NFT a été mint avec succès ! Transaction hash: " + transactionHash);
                return true;
            });

            return true;
        } else if (args[0].equalsIgnoreCase("mynft")) {
            Player player = (Player) sender;
            String playerAddress = MarketPlacePlugin.getInstance().getPlayerService().getPlayerAddress();

            CompletableFuture.runAsync(() -> {
                Web3Service.getNfts().forEach((s, s2) -> {
                    sender.sendMessage("§a" + s + " → " + s2);
                    player.getInventory().addItem(Objects.requireNonNull(Base64ItemStack.decode(s2)));
                });
                /*
                List<NFTData> nftDataList = MarketPlacePlugin.getInstance().getWeb3Service().getPlayerNFTData(playerAddress);
                if (nftDataList.isEmpty()) {
                    sender.sendMessage("🚫 Aucun NFT trouvé.");
                } else {
                    for (NFTData data : nftDataList) {
                        sender.sendMessage("🎨 NFT #" + data.tokenId() + " → " + data.itemId());
                        player.getInventory().addItem(Objects.requireNonNull(Base64ItemStack.decode(Web3Service.getNfts().get(data.itemId()))));
                    }
                }*/
            });
        }
        return false;
    }
}
