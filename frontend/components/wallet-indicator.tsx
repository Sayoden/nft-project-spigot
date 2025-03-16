// components/wallet-indicator.tsx
"use client"

import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"

export function WalletIndicator() {
  const { isConnected, address } = useWallet()
  const router = useRouter()

  const shortAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` 
    : ""

  const handleClick = () => {
    router.push("/account/wallet")
  }

  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      size="sm"
      onClick={handleClick}
      className={`ml-2 ${isConnected ? "bg-gray-800 border-green-600 text-green-400" : "bg-green-600 text-white"}`}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? shortAddress : "Connecter"}
    </Button>
  )
}

export default WalletIndicator