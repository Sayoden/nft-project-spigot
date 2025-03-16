// app/layout.tsx
import type React from "react"
import Header from "@/components/header"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/hooks/use-wallet"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MineCraft - Blockchain Minecraft",
  description: "Explorez la blockchain Minecraft",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <WalletProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </WalletProvider>
      </body>
    </html>
  )
}