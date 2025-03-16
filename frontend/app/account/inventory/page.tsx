// app/account/inventory/page.tsx (mise à jour)
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import web3Service from "@/lib/web3Service"

const ITEMS_PER_PAGE = 12

export default function InventoryPage() {
  const { isConnected, address } = useWallet()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterRarity, setFilterRarity] = useState("")
  const [inventoryItems, setInventoryItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les NFT de l'utilisateur lorsqu'il est connecté
  useEffect(() => {
    async function fetchPlayerNFTs() {
      if (isConnected && address) {
        setLoading(true)
        try {
          const result = await web3Service.getPlayerNFTs(address)
          if (result.success) {
            setInventoryItems(result.nfts)
          } else {
            setError("Erreur lors de la récupération des NFTs")
            // Utiliser des données de test en cas d'erreur
            setInventoryItems([])
          }
        } catch (err) {
          console.error("Erreur:", err)
          setError("Erreur lors de la récupération des NFTs")
          setInventoryItems([])
        } finally {
          setLoading(false)
        }
      }
    }

    fetchPlayerNFTs()
  }, [isConnected, address])

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || item.type === filterType) &&
      (filterRarity === "" || item.rarity === filterRarity),
  )

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
          &larr; Retour au compte
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Mon Inventaire</h1>
        <div className="bg-gray-800 p-8 rounded-lg">
          <p className="text-xl mb-4">Connectez votre wallet pour voir vos NFTs Minecraft</p>
          <Link href="/account/wallet">
            <Button className="bg-green-500 hover:bg-green-600 text-white">Connecter Wallet</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
        &larr; Retour au compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Mon Inventaire</h1>
      
      {error && (
        <div className="bg-red-900 border border-red-800 p-4 rounded-lg mb-6 text-white">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Rechercher un item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-white placeholder:text-gray-500"
          />
        </div>
        <div className="flex gap-4">
          <Select onValueChange={(value) => setFilterType(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px] text-white border-gray-700">
              <SelectValue placeholder="Type d'item" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white">
                Tous les types
              </SelectItem>
              <SelectItem value="Bloc" className="text-white">
                Bloc
              </SelectItem>
              <SelectItem value="Outil" className="text-white">
                Outil
              </SelectItem>
              <SelectItem value="Arme" className="text-white">
                Arme
              </SelectItem>
              <SelectItem value="Armure" className="text-white">
                Armure
              </SelectItem>
              <SelectItem value="Consommable" className="text-white">
                Consommable
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setFilterRarity(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px] text-white border-gray-700">
              <SelectValue placeholder="Rareté" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white">
                Toutes les raretés
              </SelectItem>
              <SelectItem value="Commun" className="text-white">
                Commun
              </SelectItem>
              <SelectItem value="Peu commun" className="text-white">
                Peu commun
              </SelectItem>
              <SelectItem value="Rare" className="text-white">
                Rare
              </SelectItem>
              <SelectItem value="Épique" className="text-white">
                Épique
              </SelectItem>
              <SelectItem value="Légendaire" className="text-white">
                Légendaire
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center mb-8">
          <p className="text-xl mb-4">Aucun NFT trouvé</p>
          <p className="text-gray-400">
            Connectez-vous au serveur Minecraft et utilisez la commande /nft mint pour créer des NFT
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentItems.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {filteredItems.length > ITEMS_PER_PAGE && (
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredItems.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}

function InventoryItem({ item }) {
  return (
    <Card className="bg-gray-800 border-gray-700 transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-green-400">{item.name}</CardTitle>
        <CardDescription className="text-gray-300">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="secondary" className="bg-gray-700 text-white">
            {item.type}
          </Badge>
          <Badge
            variant="outline"
            className={
              item.rarity === "Commun"
                ? "border-gray-500 text-gray-300"
                : item.rarity === "Peu commun"
                  ? "border-green-500 text-green-400"
                  : item.rarity === "Rare"
                    ? "border-blue-500 text-blue-400"
                    : item.rarity === "Épique"
                      ? "border-purple-500 text-purple-400"
                      : "border-orange-500 text-orange-400"
            }
          >
            {item.rarity}
          </Badge>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg mb-2 flex justify-center items-center h-32">
          <img 
            src={item.image || "/placeholder.svg"} 
            alt={item.name} 
            className="h-full object-contain"
          />
        </div>
        <div className="text-center text-sm text-gray-400 mt-2">
          Token ID: {item.id}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
          Détails
        </Button>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          Mettre en vente
        </Button>
      </CardFooter>
    </Card>
  )
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex flex-wrap justify-center gap-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              onClick={() => paginate(number)}
              variant={currentPage === number ? "default" : "outline"}
              className={`${currentPage === number ? "bg-green-500 hover:bg-green-600 text-white" : "text-green-400 hover:text-green-500 border-gray-700"} px-3 py-1`}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}