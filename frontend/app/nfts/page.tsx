// app/nfts/page.tsx (mise à jour)
"use client"
import { useState, useEffect } from "react"
import { CuboidIcon as Cube } from "lucide-react"
import { Button } from "@/components/ui/button"
import web3Service from "@/lib/web3Service"
import { useWallet } from "@/hooks/use-wallet"

const ITEMS_PER_PAGE = 12

export default function NFTsPage() {
  const { isConnected } = useWallet()
  const [currentPage, setCurrentPage] = useState(1)
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchListedNFTs() {
      setLoading(true)
      try {
        const result = await web3Service.getListedNFTs()
        if (result.success) {
          setNfts(result.nfts)
        } else {
          setError("Erreur lors de la récupération des NFTs")
          setNfts([])
        }
      } catch (err) {
        console.error("Erreur:", err)
        setError("Erreur lors de la récupération des NFTs")
        setNfts([])
      } finally {
        setLoading(false)
      }
    }

    fetchListedNFTs()
  }, [])

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = nfts.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">NFTs Minecraft en vente</h1>
      
      {error && (
        <div className="bg-red-900 border border-red-800 p-4 rounded-lg mb-6 text-white">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-xl mb-4">Aucun NFT en vente actuellement</p>
          <p className="text-gray-400">
            Revenez plus tard ou mettez vos propres NFT en vente
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((nft) => (
            <NFTCard key={nft.id} nft={nft} isConnected={isConnected} />
          ))}
        </div>
      )}

      {nfts.length > ITEMS_PER_PAGE && (
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={nfts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}

function NFTCard({ nft, isConnected }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="p-4">
        <div className="h-32 flex justify-center items-center mb-4">
          {nft.image ? (
            <img src={nft.image} alt={nft.name} className="h-full object-contain" />
          ) : (
            <Cube className="w-full h-full text-green-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{nft.name}</h3>
        <p className="text-gray-400 mb-2">{nft.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-400 font-bold">{nft.price} ETH</span>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              nft.rarity === "Commun"
                ? "bg-gray-600 text-white"
                : nft.rarity === "Rare"
                  ? "bg-blue-600 text-white"
                  : nft.rarity === "Épique"
                    ? "bg-purple-600 text-white"
                    : "bg-yellow-500 text-black"
            }`}
          >
            {nft.rarity}
          </span>
        </div>
        <div className="text-center text-sm text-gray-400 mb-4">
          Token ID: {nft.id}
        </div>
      </div>
      <Button 
        className="w-full rounded-none py-3" 
        disabled={!isConnected}
      >
        {isConnected ? "Acheter" : "Connectez-vous pour acheter"}
      </Button>
    </div>
  )
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              onClick={() => paginate(number)}
              variant={currentPage === number ? "default" : "outline"}
              className={
                currentPage === number ? "bg-green-500 hover:bg-green-600" : "text-green-400 hover:text-green-500"
              }
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}