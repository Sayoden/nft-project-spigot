"use client"

import { useState } from "react"
import Link from "next/link"
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Données factices pour simuler les transactions
const TRANSACTIONS = Array.from({ length: 10 }, (_, i) => ({
  id: `0x${Math.random().toString(16).substr(2, 8)}`,
  type: Math.random() > 0.5 ? "receive" : "send",
  amount: (Math.random() * 10).toFixed(4),
  address: `0x${Math.random().toString(16).substr(2, 40)}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  status: Math.random() > 0.2 ? "confirmed" : "pending",
}))

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeWallet, setActiveWallet] = useState(null)
  const [copied, setCopied] = useState(false)

  // Adresse factice du portefeuille
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`

  const handleConnect = (walletType) => {
    // Simulation de connexion
    setTimeout(() => {
      setIsConnected(true)
      setActiveWallet(walletType)
    }, 1000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setActiveWallet(null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
        &larr; Retour au compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Mon Portefeuille</h1>

      {!isConnected ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WalletOption
            title="MetaMask"
            description="Connectez-vous avec le portefeuille le plus populaire pour Ethereum"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("metamask")}
          />
          <WalletOption
            title="WalletConnect"
            description="Scannez un QR code pour vous connecter avec n'importe quel portefeuille mobile"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("walletconnect")}
          />
          <WalletOption
            title="Coinbase Wallet"
            description="Utilisez Coinbase Wallet pour accéder à vos actifs"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("coinbase")}
          />
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-green-400">Portefeuille {activeWallet}</CardTitle>
                <Button
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-700"
                  onClick={handleDisconnect}
                >
                  Déconnecter
                </Button>
              </div>
              <CardDescription className="flex items-center mt-2 text-gray-300">
                {shortAddress}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Solde MCoin</p>
                  <p className="text-2xl font-bold text-green-400">1,234.56 MCoin</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Valeur estimée</p>
                  <p className="text-2xl font-bold text-green-400">$2,469.12</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Recevoir
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 text-white">
              <TabsTrigger value="assets" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Actifs
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Activité
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assets" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Mes Actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Token</TableHead>
                        <TableHead className="text-gray-300">Solde</TableHead>
                        <TableHead className="text-gray-300 text-right">Valeur</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium text-white">MCoin</TableCell>
                        <TableCell className="text-white">1,234.56</TableCell>
                        <TableCell className="text-right text-white">$2,469.12</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium text-white">Bloc Token</TableCell>
                        <TableCell className="text-white">42.0</TableCell>
                        <TableCell className="text-right text-white">$84.00</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium text-white">Craft Token</TableCell>
                        <TableCell className="text-white">7.5</TableCell>
                        <TableCell className="text-right text-white">$15.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Historique des Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Montant</TableHead>
                        <TableHead className="text-gray-300">Adresse</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Statut</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TRANSACTIONS.map((tx) => (
                        <TableRow key={tx.id} className="border-gray-700">
                          <TableCell>
                            {tx.type === "receive" ? (
                              <Badge variant="outline" className="border-green-500 text-green-500">
                                <ArrowDownLeft className="mr-1 h-3 w-3" />
                                Reçu
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-blue-500 text-blue-500">
                                <ArrowUpRight className="mr-1 h-3 w-3" />
                                Envoyé
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-white">
                            {tx.type === "receive" ? "+" : "-"}
                            {tx.amount} MCoin
                          </TableCell>
                          <TableCell className="font-mono text-xs text-gray-300">
                            {`${tx.address.substring(0, 6)}...${tx.address.substring(tx.address.length - 4)}`}
                          </TableCell>
                          <TableCell className="text-gray-300">{new Date(tx.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            {tx.status === "confirmed" ? (
                              <Badge variant="outline" className="border-green-500 text-green-500">
                                Confirmé
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                En attente
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

function WalletOption({ title, description, icon, onClick }) {
  return (
    <Card
      className="bg-gray-800 border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <img src={icon || "/placeholder.svg"} alt={title} className="h-12 w-12" />
        <div>
          <CardTitle className="text-green-400">{title}</CardTitle>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
          <Wallet className="mr-2 h-4 w-4" />
          Connecter
        </Button>
      </CardFooter>
    </Card>
  )
}

