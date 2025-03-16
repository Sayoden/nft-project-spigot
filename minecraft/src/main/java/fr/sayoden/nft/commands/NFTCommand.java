package fr.sayoden.nft.commands;

import dev.s7a.base64.Base64ItemStack;
import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.dto.ListedNFTData;
import fr.sayoden.nft.menu.NFTMarketMenu;
import fr.sayoden.nft.services.Web3Service;
import org.bukkit.Sound;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

public class NFTCommand implements CommandExecutor {

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String label, @NotNull String[] args) {
        if (args[0].equalsIgnoreCase("link")) {
            String playerAddress = args[1];
            MarketPlacePlugin.getInstance().getPlayerService().setPlayerAddress(playerAddress);

            if (args.length > 2) {
                MarketPlacePlugin.getInstance().getWeb3Service().setCredentials(args[2]);
            }

            Web3Service.getNfts().putIfAbsent(MarketPlacePlugin.getInstance().getPlayerService().getPlayerAddress().toLowerCase(), new ArrayList<>());

            sender.sendMessage("§aVos transactions sont reliées a l'adresse: §l" + playerAddress);
            return true;

        } else if (args[0].equalsIgnoreCase("mint")) {
            Player player = (Player) sender;
            String itemBase64 = Base64ItemStack.encode(player.getInventory().getItemInHand());
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

            System.out.println(Web3Service.getNfts().get(playerAddress.toLowerCase()).toString());

            Web3Service.getNfts().get(playerAddress.toLowerCase()).forEach(nftData -> {
                player.getInventory().addItem(Objects.requireNonNull(Base64ItemStack.decode(nftData.itemBase64())));
            });
            return true;
        } else if (args[0].equalsIgnoreCase("contract")) {
            sender.sendMessage("§aAdresse du contrat: §l" + MarketPlacePlugin.getMarketplaceContractAddress());
            String newAddress = args[1];
            MarketPlacePlugin.setMarketplaceContractAddress(newAddress);
            sender.sendMessage("§aNouvelle adresse du contrat: §l" + newAddress);
            return true;
        } else if (args[0].equalsIgnoreCase("list")) {
            Player player = (Player) sender;
            NFTMarketMenu.open(player, MarketPlacePlugin.getInstance().getWeb3Service());
        }
        return false;
    }
}
