"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données factices pour simuler les transactions
const ITEMS_PER_PAGE = 10
const TOTAL_PAGES = 5
const TRANSACTION_DATA = Array.from({ length: ITEMS_PER_PAGE * TOTAL_PAGES }, (_, i) => ({
  id: `0x${Math.random().toString(16).substr(2, 8)}`,
  from: `0x${Math.random().toString(16).substr(2, 40)}`,
  to: `0x${Math.random().toString(16).substr(2, 40)}`,
  amount: (Math.random() * 100).toFixed(4),
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  status: Math.random() > 0.2 ? "Confirmée" : "En attente",
}))

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: "timestamp", direction: "desc" })

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = [...TRANSACTION_DATA]
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
      <h1 className="text-4xl font-bold mb-8 text-green-400">Transactions Blockchain Minecraft</h1>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => requestSort("id")}>
                  ID{" "}
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>De</TableHead>
              <TableHead>Vers</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("amount")}>
                  Montant{" "}
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="inline ml-2" />
                    ) : (
                      <ChevronDown className="inline ml-2" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort("timestamp")}>
                  Date{" "}
                  {sortConfig.key === "timestamp" &&
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
            {currentItems.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono">{transaction.id}</TableCell>
                <TableCell className="font-mono">{`${transaction.from.substr(0, 6)}...${transaction.from.substr(-4)}`}</TableCell>
                <TableCell className="font-mono">{`${transaction.to.substr(0, 6)}...${transaction.to.substr(-4)}`}</TableCell>
                <TableCell>{transaction.amount} MCoin</TableCell>
                <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      transaction.status === "Confirmée" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={TRANSACTION_DATA.length}
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

