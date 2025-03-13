"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Données factices pour simuler les blocs
const ITEMS_PER_PAGE = 12
const TOTAL_PAGES = 5
const BLOCK_DATA = Array.from({ length: ITEMS_PER_PAGE * TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  name: `Bloc ${i + 1}`,
  description: `Description du bloc ${i + 1}`,
  rarity: ["Commun", "Peu commun", "Rare", "Épique", "Légendaire"][Math.floor(Math.random() * 5)],
  type: ["Construction", "Décoration", "Utilitaire", "Redstone"][Math.floor(Math.random() * 4)],
  value: (Math.random() * 1000).toFixed(2),
}))

export default function BlocksPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRarity, setFilterRarity] = useState("")
  const [filterType, setFilterType] = useState("")

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE

  const filteredBlocks = BLOCK_DATA.filter(
    (block) =>
      block.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRarity === "" || block.rarity === filterRarity) &&
      (filterType === "" || block.type === filterType),
  )

  const currentItems = filteredBlocks.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Blocs Minecraft Blockchain</h1>
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        <Input
          type="text"
          placeholder="Rechercher un bloc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 text-white placeholder:text-gray-500"
        />
        <Select onValueChange={setFilterRarity}>
          <SelectTrigger className="w-full md:w-1/4 text-white border-gray-700">
            <SelectValue placeholder="Filtrer par rareté" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
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
        <Select onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-1/4 text-white border-gray-700">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="all" className="text-white">
              Tous les types
            </SelectItem>
            <SelectItem value="Construction" className="text-white">
              Construction
            </SelectItem>
            <SelectItem value="Décoration" className="text-white">
              Décoration
            </SelectItem>
            <SelectItem value="Utilitaire" className="text-white">
              Utilitaire
            </SelectItem>
            <SelectItem value="Redstone" className="text-white">
              Redstone
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentItems.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredBlocks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

function BlockCard({ block }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-green-400">{block.name}</CardTitle>
        <CardDescription className="text-gray-300">{block.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-gray-400">Type:</div>
          <div className="text-sm font-semibold text-white">{block.type}</div>
          <div className="text-sm text-gray-400">Rareté:</div>
          <div className="text-sm font-semibold text-white">{block.rarity}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-green-400 font-bold">{block.value} MCoin</div>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          Acheter
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
          <li key={number} className="mt-2">
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

