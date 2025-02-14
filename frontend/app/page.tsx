import Image from "next/image"
import { CuboidIcon as Cube, Coins, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Monde Minecraft"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex flex-col justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-green-400">Bienvenue dans MineCraft</h1>
          <p className="text-xl mb-8">
            Explorez le premier monde Minecraft propulsé par la blockchain. Construisez, échangez et possédez vos
            créations en toute sécurité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<Cube className="h-8 w-8 text-green-400" />}
              title="Blocs Uniques"
              description="Créez et possédez des blocs NFT uniques dans le monde Minecraft."
            />
            <FeatureCard
              icon={<Coins className="h-8 w-8 text-green-400" />}
              title="Économie Décentralisée"
              description="Échangez des ressources et des créations sur notre marketplace blockchain."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-green-400" />}
              title="Sécurité Maximale"
              description="Vos actifs et vos créations sont protégés par la technologie blockchain."
            />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Commencer l'aventure
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

