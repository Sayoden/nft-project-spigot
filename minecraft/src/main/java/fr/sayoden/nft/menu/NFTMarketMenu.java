package fr.sayoden.nft.menu;

import dev.s7a.base64.Base64ItemStack;
import fr.minuskube.inv.ClickableItem;
import fr.minuskube.inv.InventoryManager;
import fr.minuskube.inv.SmartInventory;
import fr.minuskube.inv.content.InventoryContents;
import fr.minuskube.inv.content.InventoryProvider;
import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.dto.ListedNFTData;
import fr.sayoden.nft.dto.NFTData;
import fr.sayoden.nft.services.Web3Service;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;

import java.math.BigInteger;
import java.util.List;

public class NFTMarketMenu implements InventoryProvider {
    private final Web3Service web3Service;

    public NFTMarketMenu(Web3Service web3Service) {
        this.web3Service = web3Service;
    }

    public static void open(Player player, Web3Service web3Service) {
        SmartInventory.builder()
                .id("nft_market")
                .provider(new NFTMarketMenu(web3Service))
                .size(5, 9)
                .title("🛒 NFT Marketplace")
                .manager(MarketPlacePlugin.getInstance().getInventoryManager())
                .build()
                .open(player);
    }

    @Override
    public void init(Player player, InventoryContents contents) {
        List<ListedNFTData> listedNFTs = web3Service.getAllListedNFTs();

        if (listedNFTs.isEmpty()) {
            player.sendMessage("❌ Aucun NFT en vente !");
            return;
        }

        for (int i = 0; i < listedNFTs.size(); i++) {
            ListedNFTData nft = listedNFTs.get(i);

            System.out.println(nft);

            int finalI = i;
            if (Web3Service.getNfts().containsKey(nft.getSellerAddress().toLowerCase())) {
                Web3Service.getNfts().get(nft.getSellerAddress().toLowerCase()).forEach(nftData -> {
                    if (nftData.tokenId().equalsIgnoreCase(nft.getTokenId().toString())) {
                        System.out.println("Register data: " + nftData.itemBase64());
                        ItemStack item = Base64ItemStack.decode(nftData.itemBase64());
                        if (item == null) {
                            return;
                        }
                        ItemMeta meta = item.getItemMeta();
                        meta.setLore(List.of(
                                "👤 Vendeur: " + nft.getSellerAddress(),
                                "💰 Prix: " + nft.getPrice() + " wei",
                                "§e▶ Cliquez pour acheter !"
                        ));
                        item.setItemMeta(meta);

                        contents.set(finalI / 9, finalI % 9, ClickableItem.of(item, e -> {
                            player.closeInventory();
                            buyNFT(player, nft.getTokenId(), nft.getPrice());
                        }));
                    }
                });
            }
        }
    }

    @Override
    public void update(Player player, InventoryContents contents) {
        // Pas besoin de mise à jour automatique ici
    }

    private void buyNFT(Player player, BigInteger tokenId, BigInteger price) {
        player.sendMessage("⏳ Achat du NFT " + tokenId + " pour " + price + " wei...");
        //web3Service.buyNFT(player.getUniqueId().toString(), tokenId, price);
    }
}
