"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données factices pour simuler les joueurs
const ITEMS_PER_PAGE = 10
const TOTAL_PAGES = 5
const PLAYER_DATA = Array.from({ length: ITEMS_PER_PAGE * TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  username: `Player${i + 1}`,
  level: Math.floor(Math.random() * 100) + 1,
  balance: (Math.random() * 10000).toFixed(2),
  blocksPlaced: Math.floor(Math.random() * 100000),
  lastSeen: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  status: Math.random() > 0.3 ? "En ligne" : "Hors ligne",
}))

export default function PlayersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: "level", direction: "desc" })
  const [searchTerm, setSearchTerm] = useState("")

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE

  const filteredPlayers = PLAYER_DATA.filter((player) =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentItems = [...filteredPlayers]
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
    .slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const requestSort = (key: string) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">Joueurs Minecraft Blockchain</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Rechercher un joueur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("level")}>
                  Niveau{" "}
                  {sortConfig.key === "level" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("balance")}>
                  Solde{" "}
                  {sortConfig.key === "balance" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("blocksPlaced")}>
                  Blocs placés{" "}
                  {sortConfig.key === "blocksPlaced" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("lastSeen")}>
                  Dernière connexion{" "}
                  {sortConfig.key === "lastSeen" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((player) => (
              <TableRow key={player.id}>
                <TableCell>{player.id}</TableCell>
                <TableCell className="font-medium">{player.username}</TableCell>
                <TableCell>{player.level}</TableCell>
                <TableCell>{player.balance} MCoin</TableCell>
                <TableCell>{player.blocksPlaced.toLocaleString()}</TableCell>
                <TableCell>{new Date(player.lastSeen).toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      player.status === "En ligne" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}
                  >
                    {player.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredPlayers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
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

