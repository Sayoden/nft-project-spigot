// app/api/nft/[tokenId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function getNFTMetadata(tokenId: string) {
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
        image: "/placeholder.svg",
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
