package fr.sayoden.nft.services;

import java.sql.*;

public class DatabaseService {

    private static final String DB_URL = "jdbc:sqlite:nfts.db";

    public static void initializeDatabase() {
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement stmt = conn.prepareStatement(
                     "CREATE TABLE IF NOT EXISTS nfts (" +
                             "id TEXT PRIMARY KEY, " +
                             "item_base64 TEXT NOT NULL)"
             )) {
            stmt.execute();
            System.out.println("✅ Database initialized.");
            fetchNFTs();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void saveNFT(String tokenId, String itemBase64) {
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO nfts (id, item_base64) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET item_base64 = excluded.item_base64"
             )) {
            stmt.setString(1, tokenId);
            stmt.setString(2, itemBase64);
            stmt.executeUpdate();
            System.out.println("✅ NFT saved: " + tokenId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void fetchNFTs() {
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM nfts");
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                String tokenId = rs.getString("id");
                String itemBase64 = rs.getString("item_base64");
                System.out.println("NFT ID: " + tokenId + ", Item Base64: " + itemBase64);
                Web3Service.getNfts().put(tokenId, itemBase64);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
