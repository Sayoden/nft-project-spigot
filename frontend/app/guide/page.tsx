"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const guideContent = [
  {
    title: "Introduction à Minecraft Blockchain",
    content:
      "Bienvenue dans le monde révolutionnaire de Minecraft Blockchain ! Notre plateforme combine le jeu créatif que vous aimez avec la puissance de la technologie blockchain. Ici, chaque bloc que vous placez, chaque structure que vous construisez, et chaque ressource que vous récoltez a une valeur réelle et vérifiable sur la blockchain.",
  },
  {
    title: "Commencer",
    content:
      "Pour commencer votre aventure sur Minecraft Blockchain, suivez ces étapes simples :\n\n1. Créez un compte sur notre plateforme\n2. Connectez votre portefeuille crypto (nous supportons MetaMask, Trust Wallet, et plus)\n3. Téléchargez notre client Minecraft modifié\n4. Connectez-vous au jeu avec vos identifiants de plateforme\n5. Commencez à jouer, construire et échanger !",
  },
  {
    title: "Comprendre les Blocs NFT",
    content:
      "Dans Minecraft Blockchain, chaque bloc est un NFT (Token Non Fongible) unique. Cela signifie :\n\n- Chaque bloc a un propriétaire vérifiable\n- Les blocs peuvent être échangés sur notre marketplace\n- Les blocs rares ont une valeur plus élevée\n- Vous pouvez créer des structures uniques et les vendre comme des NFT complets",
  },
  {
    title: "Économie du jeu",
    content:
      "Notre économie in-game est basée sur MCoin, notre cryptomonnaie native. Vous pouvez gagner des MCoins en :\n\n- Minant des ressources rares\n- Vendant vos créations sur le marketplace\n- Participant à des événements communautaires\n- Complétant des quêtes et des défis\n\nLes MCoins peuvent être échangés contre d'autres cryptomonnaies ou utilisés pour acheter des items exclusifs dans le jeu.",
  },
  {
    title: "Crafting et Rareté",
    content:
      "Le système de crafting dans Minecraft Blockchain est lié à la rareté des blocs. Plus une recette utilise de blocs rares, plus l'item crafté sera valuable. Expérimentez avec différentes combinaisons pour découvrir des items légendaires !",
  },
  {
    title: "Gouvernance Communautaire",
    content:
      "Minecraft Blockchain est géré par sa communauté. En tant que joueur, vous avez votre mot à dire dans l'évolution du jeu :\n\n- Votez sur les propositions de développement\n- Suggérez de nouvelles fonctionnalités\n- Participez aux décisions économiques importantes\n\nVotre pouvoir de vote est proportionnel à votre participation dans l'écosystème.",
  },
  {
    title: "Sécurité et Propriété",
    content:
      "La sécurité de vos actifs est notre priorité. Tous vos blocs, items et MCoins sont sécurisés sur la blockchain. Nous utilisons des contrats intelligents audités pour garantir la transparence et la sécurité de toutes les transactions.",
  },
  {
    title: "Support et Communauté",
    content:
      "Si vous avez des questions ou besoin d'aide :\n\n- Consultez notre FAQ détaillée\n- Rejoignez notre serveur Discord pour le support communautaire\n- Contactez notre équipe de support via le formulaire sur le site\n\nN'oubliez pas de suivre nos réseaux sociaux pour les dernières nouvelles et mises à jour !",
  },
]

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState(guideContent[0].title)
  const sectionRefs = useRef({})

  // Initialiser les refs pour chaque section
  useEffect(() => {
    guideContent.forEach((section) => {
      sectionRefs.current[section.title] = sectionRefs.current[section.title] || { current: null }
    })
  }, [])

  const scrollToSection = (sectionTitle) => {
    setActiveSection(sectionTitle)
    const sectionElement = document.getElementById(sectionTitle.replace(/\s+/g, "-").toLowerCase())
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">
        Guide d'utilisation de Minecraft Blockchain
      </h1>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar avec table des matières */}
        <div className="lg:col-span-1 mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-20 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">Table des matières</h2>
            <nav className="space-y-2">
              {guideContent.map((section) => (
                <Button
                  key={section.title}
                  variant="ghost"
                  className={`w-full justify-start text-left px-3 py-2 ${
                    activeSection === section.title
                      ? "bg-gray-700 text-green-400"
                      : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                  onClick={() => scrollToSection(section.title)}
                >
                  {section.title}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {guideContent.map((section) => (
              <div
                key={section.title}
                id={section.title.replace(/\s+/g, "-").toLowerCase()}
                className="bg-gray-800 rounded-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-green-400">{section.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={() => scrollToSection(section.title)}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-gray-300 whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

