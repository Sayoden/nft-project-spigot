"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Données factices pour simuler l'inventaire
const ITEMS_PER_PAGE = 12
const INVENTORY_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description de l'item ${i + 1}`,
  type: ["Bloc", "Outil", "Arme", "Armure", "Consommable"][Math.floor(Math.random() * 5)],
  rarity: ["Commun", "Peu commun", "Rare", "Épique", "Légendaire"][Math.floor(Math.random() * 5)],
  quantity: Math.floor(Math.random() * 64) + 1,
}))

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterRarity, setFilterRarity] = useState("")

  const filteredItems = INVENTORY_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || item.type === filterType) &&
      (filterRarity === "" || item.rarity === filterRarity),
  )

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
        &larr; Retour au compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Mon Inventaire</h1>

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
          <Select onValueChange={setFilterType}>
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
          <Select onValueChange={setFilterRarity}>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentItems.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </div>

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

function InventoryItem({ item }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-green-400">{item.name}</CardTitle>
        <CardDescription className="text-gray-300">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
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
        <p className="text-sm text-gray-400">
          Quantité: <span className="text-white">{item.quantity}</span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
          Utiliser
        </Button>
        <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
          Échanger
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

