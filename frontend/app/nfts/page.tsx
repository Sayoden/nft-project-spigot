"use client"

import { useState } from "react"
import { CuboidIcon as Cube } from "lucide-react"
import { Button } from "@/components/ui/button"

// Données factices pour simuler les NFTs
const ITEMS_PER_PAGE = 12
const TOTAL_PAGES = 5
const NFT_DATA = Array.from({ length: ITEMS_PER_PAGE * TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  name: `Minecraft NFT #${i + 1}`,
  description: `Un NFT unique dans l'univers Minecraft`,
  price: (Math.random() * 10).toFixed(2),
  rarity: ["Commun", "Rare", "Épique", "Légendaire"][Math.floor(Math.random() * 4)],
}))

export default function NFTsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = NFT_DATA.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">NFTs Minecraft</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={NFT_DATA.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

function NFTCard({ nft }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="p-4">
        <Cube className="w-full h-32 text-green-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{nft.name}</h3>
        <p className="text-gray-400 mb-4">{nft.description}</p>
        <div className="flex justify-between items-center">
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
      </div>
      <Button className="w-full rounded-none py-3">Acheter</Button>
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

