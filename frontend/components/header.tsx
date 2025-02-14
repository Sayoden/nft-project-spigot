"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, CuboidIcon as Cube, Coins, Users, Book, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-gray-900" : "bg-gradient-to-b from-gray-900/80 to-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-500 flex items-center">
              <Cube className="mr-2 h-8 w-8" />
              MineCraft
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu" className="text-white">
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/blocks" className="text-sm font-medium text-white hover:text-green-400 flex items-center">
              <Cube className="mr-2 h-4 w-4" />
              Blocs
            </Link>
            <Link href="/nfts" className="text-sm font-medium text-white hover:text-green-400 flex items-center">
              <Diamond className="mr-2 h-4 w-4" />
              NFTs
            </Link>
            <Link
              href="/transactions"
              className="text-sm font-medium text-white hover:text-green-400 flex items-center"
            >
              <Coins className="mr-2 h-4 w-4" />
              Transactions
            </Link>
            <Link href="/players" className="text-sm font-medium text-white hover:text-green-400 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Joueurs
            </Link>
            <Link href="/guide" className="text-sm font-medium text-white hover:text-green-400 flex items-center">
              <Book className="mr-2 h-4 w-4" />
              Guide
            </Link>
          </nav>

          {/* Profile dropdown */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  Mon Compte
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 text-white border-gray-700">
                <DropdownMenuLabel>Mon Profil Minecraft</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Inventaire</DropdownMenuItem>
                <DropdownMenuItem>Portefeuille</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-900 p-2 transition transform origin-top md:hidden">
              <nav className="grid gap-y-8 py-4">
                <Link
                  href="/blocks"
                  className="text-base font-medium text-white hover:text-green-400 flex items-center"
                >
                  <Cube className="mr-2 h-5 w-5" />
                  Blocs
                </Link>
                <Link href="/nfts" className="text-base font-medium text-white hover:text-green-400 flex items-center">
                  <Diamond className="mr-2 h-5 w-5" />
                  NFTs
                </Link>
                <Link
                  href="/transactions"
                  className="text-base font-medium text-white hover:text-green-400 flex items-center"
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Transactions
                </Link>
                <Link
                  href="/players"
                  className="text-base font-medium text-white hover:text-green-400 flex items-center"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Joueurs
                </Link>
                <Link href="/guide" className="text-base font-medium text-white hover:text-green-400 flex items-center">
                  <Book className="mr-2 h-5 w-5" />
                  Guide
                </Link>
                <Button variant="ghost" className="text-white justify-start">
                  Mon Compte
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

