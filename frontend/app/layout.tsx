import type React from "react"
import Header from "@/components/header"
import { Inter } from "next/font/google"
import "./globals.css"

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
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'