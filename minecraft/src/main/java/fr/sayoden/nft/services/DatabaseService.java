package fr.sayoden.nft.services;

import fr.sayoden.nft.MarketPlacePlugin;
import fr.sayoden.nft.dto.NFTData;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;

public class DatabaseService {

    private static String getDatabasePath() {
        File pluginFolder = MarketPlacePlugin.getInstance().getDataFolder();
        if (!pluginFolder.exists()) {
            pluginFolder.mkdirs();
        }
        return "jdbc:sqlite:" + pluginFolder.getAbsolutePath() + File.separator + "nfts.db";
    }

    public static void initializeDatabase() {
        try (Connection conn = DriverManager.getConnection(getDatabasePath());
             PreparedStatement stmt = conn.prepareStatement(
                     "CREATE TABLE IF NOT EXISTS nfts (" +
                             "id TEXT PRIMARY KEY, " +
                             "player_address TEXT NOT NULL, " +
                             "item_base64 TEXT NOT NULL)"
             )) {
            stmt.execute();
            System.out.println("✅ Database initialized.");
            fetchNFTs();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void saveNFT(String tokenId, String itemBase64, String playerAddress) {
        try (Connection conn = DriverManager.getConnection(getDatabasePath());
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO nfts (id, player_address, item_base64) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET item_base64 = excluded.item_base64"
             )) {
            stmt.setString(1, tokenId);
            stmt.setString(2, playerAddress.toLowerCase());
            stmt.setString(3, itemBase64);
            stmt.executeUpdate();
            System.out.println("✅ NFT saved: " + tokenId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void fetchNFTs() {
        try (Connection conn = DriverManager.getConnection(getDatabasePath());
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM nfts");
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                String tokenId = rs.getString("id");
                String playerAddress = rs.getString("player_address");
                String itemBase64 = rs.getString("item_base64");
                System.out.println("NFT ID: " + tokenId + ", Item Base64: " + itemBase64);
                Web3Service.getNfts().putIfAbsent(playerAddress.toLowerCase(), new ArrayList<>());
                Web3Service.getNfts().get(playerAddress.toLowerCase()).add(new NFTData(tokenId, itemBase64));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
