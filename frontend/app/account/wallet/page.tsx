// app/account/wallet/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/hooks/use-wallet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const { isConnected, isConnecting, connect, disconnect,switchAccount, address, error, balance } = useWallet()
  const [copied, setCopied] = useState(false)
  
  const shortAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` 
    : ""

  const handleConnect = (walletType) => {
    connect(walletType)
  }

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
        &larr; Retour au compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Mon Portefeuille</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4 bg-red-900 border-red-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!isConnected ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WalletOption
            title="MetaMask"
            description="Connectez-vous avec le portefeuille le plus populaire pour Ethereum"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("metamask")}
            isLoading={isConnecting}
          />
          <WalletOption
            title="WalletConnect"
            description="Scannez un QR code pour vous connecter avec n'importe quel portefeuille mobile"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("walletconnect")}
            isLoading={isConnecting}
            disabled={true}
          />
          <WalletOption
            title="Coinbase Wallet"
            description="Utilisez Coinbase Wallet pour accéder à vos actifs"
            icon="/placeholder.svg?height=80&width=80"
            onClick={() => handleConnect("coinbase")}
            isLoading={isConnecting}
            disabled={true}
          />
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-green-400">Portefeuille MetaMask</CardTitle>
                <Button
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-700"
                  onClick={disconnect}
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
              <Button
                variant="outline"
                size="sm"
                className="ml-4 text-green-400 border-green-600"
                onClick={switchAccount}
                disabled={isConnecting}
              >
                {isConnecting ? "Chargement..." : "Changer de compte"}
              </Button>
            </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Solde ETH</p>
                  <p className="text-2xl font-bold text-green-400">{balance || '0.00'} ETH</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Solde MCoin</p>
                  <p className="text-2xl font-bold text-green-400">0.00 MCoin</p>
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
                        <TableCell className="font-medium text-white">ETH</TableCell>
                        <TableCell className="text-white">{balance || '0.00'}</TableCell>
                        <TableCell className="text-right text-white">-</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium text-white">MCoin</TableCell>
                        <TableCell className="text-white">0.00</TableCell>
                        <TableCell className="text-right text-white">-</TableCell>
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

function WalletOption({ title, description, icon, onClick, isLoading = false, disabled = false }) {
  return (
    <Card
      className={`bg-gray-800 border-gray-700 transition-colors ${
        !disabled ? "hover:border-green-500 cursor-pointer" : "opacity-60 cursor-not-allowed"
      }`}
      onClick={!disabled && !isLoading ? onClick : undefined}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <img src={icon || "/placeholder.svg"} alt={title} className="h-12 w-12" />
        <div>
          <CardTitle className="text-green-400">{title}</CardTitle>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white" 
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
              Connexion...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              {disabled ? "Bientôt disponible" : "Connecter"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}