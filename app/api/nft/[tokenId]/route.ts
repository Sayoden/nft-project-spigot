// app/api/nft/[tokenId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Fonction pour simuler la récupération des métadonnées d'un NFT
// Dans une implémentation réelle, vous vous connecteriez à votre base de données SQLite
async function getNFTMetadata(tokenId: string) {
    // Simulation des données
    // Dans la réalité, vous feriez une requête à votre base de données SQLite
    // qui stocke les informations Base64 de vos objets Minecraft
    
    // Déterminer le type d'objet basé sur l'ID du token (simulation)
    const types = ["Bloc", "Outil", "Arme", "Armure", "Consommable"];
    const type = types[Number(tokenId) % types.length];
    
    // Déterminer la rareté basée sur l'ID du token (simulation)
    const rarities = ["Commun", "Peu commun", "Rare", "Épique", "Légendaire"];
    const rarity = rarities[Number(tokenId) % rarities.length];
    
    return {
        name: `Minecraft Item #${tokenId}`,
        description: `Un objet Minecraft unique tokenisé sous forme de NFT`,
        type,
        rarity,
        image: "/placeholder.svg", // Utilisez un placeholder pour l'instant
        // En production, vous retourneriez une représentation ou une image de l'objet Minecraft
        // basée sur les données Base64 stockées dans votre base de données
    };
}

export async function GET(
    request: NextRequest,
    { params }: { params: { tokenId: string } }
) {
    const { tokenId } = params;
    
    try {
        // Récupérer les métadonnées du NFT
        const metadata = await getNFTMetadata(tokenId);
        
        return NextResponse.json(metadata);
    } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées du NFT:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}