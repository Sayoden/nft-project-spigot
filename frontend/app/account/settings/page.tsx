"use client"

import { useState } from "react"
import Link from "next/link"
import { Save, User, Shield, Bell, Globe, Eye, Wallet, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState("")

  const handleSave = (tab) => {
    setSaveStatus(`Paramètres ${tab} enregistrés avec succès !`)
    setTimeout(() => setSaveStatus(""), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/account" className="text-green-400 hover:text-green-300 mb-4 inline-block">
        &larr; Retour au compte
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-green-400">Paramètres</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Catégories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <SettingsNavItem
                icon={<User className="h-5 w-5" />}
                title="Profil"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
              <SettingsNavItem
                icon={<Shield className="h-5 w-5" />}
                title="Sécurité"
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              />
              <SettingsNavItem
                icon={<Bell className="h-5 w-5" />}
                title="Notifications"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <SettingsNavItem
                icon={<Globe className="h-5 w-5" />}
                title="Langue et région"
                active={activeTab === "language"}
                onClick={() => setActiveTab("language")}
              />
              <SettingsNavItem
                icon={<Eye className="h-5 w-5" />}
                title="Confidentialité"
                active={activeTab === "privacy"}
                onClick={() => setActiveTab("privacy")}
              />
              <SettingsNavItem
                icon={<Wallet className="h-5 w-5" />}
                title="Connexions"
                active={activeTab === "connections"}
                onClick={() => setActiveTab("connections")}
              />
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          {saveStatus && (
            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-md mb-6">
              {saveStatus}
            </div>
          )}

          {activeTab === "profile" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profil</CardTitle>
                <CardDescription className="text-gray-300">Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                      <AvatarFallback className="bg-gray-700 text-white">MC</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-700">
                      Changer
                    </Button>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">
                          Nom d'utilisateur
                        </Label>
                        <Input
                          id="username"
                          defaultValue="MinecraftPlayer123"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="display-name" className="text-gray-300">
                          Nom affiché
                        </Label>
                        <Input
                          id="display-name"
                          defaultValue="Mineur Pro"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="joueur@minecraft.com"
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-300">
                        Biographie
                      </Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
                        defaultValue="Mineur passionné et collectionneur de blocs rares. J'adore construire des structures complexes et échanger des ressources sur la blockchain."
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleSave("profil")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>Gérez vos paramètres de sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Mot de passe</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Authentification par application</p>
                      <p className="text-sm text-gray-400">Utilisez une application comme Google Authenticator</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Authentification par SMS</p>
                      <p className="text-sm text-gray-400">Recevez un code par SMS</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions actives</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-900 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Chrome sur Windows</p>
                          <p className="text-sm text-gray-400">Dernière activité: il y a 2 minutes</p>
                        </div>
                        <p className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Actuel</p>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Safari sur iPhone</p>
                          <p className="text-sm text-gray-400">Dernière activité: hier</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Déconnecter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleSave("sécurité")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Gérez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Transactions</p>
                        <p className="text-sm text-gray-400">Recevez des notifications pour les transactions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mises à jour</p>
                        <p className="text-sm text-gray-400">
                          Recevez des notifications pour les mises à jour de la plateforme
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing</p>
                        <p className="text-sm text-gray-400">Recevez des offres et des promotions</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dans l'application</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Transactions</p>
                        <p className="text-sm text-gray-400">Recevez des notifications pour les transactions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nouveaux blocs</p>
                        <p className="text-sm text-gray-400">
                          Recevez des notifications pour les nouveaux blocs disponibles
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Événements</p>
                        <p className="text-sm text-gray-400">Recevez des notifications pour les événements à venir</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleSave("notifications")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "language" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Langue et région</CardTitle>
                <CardDescription>Gérez vos préférences de langue et de région</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="it">Italiano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Région</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Sélectionnez une région" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="us">États-Unis</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">Royaume-Uni</SelectItem>
                        <SelectItem value="au">Australie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="paris">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paris">Europe/Paris</SelectItem>
                        <SelectItem value="london">Europe/London</SelectItem>
                        <SelectItem value="newyork">America/New_York</SelectItem>
                        <SelectItem value="losangeles">America/Los_Angeles</SelectItem>
                        <SelectItem value="tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select defaultValue="eur">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Sélectionnez une devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                        <SelectItem value="usd">Dollar américain ($)</SelectItem>
                        <SelectItem value="gbp">Livre sterling (£)</SelectItem>
                        <SelectItem value="jpy">Yen japonais (¥)</SelectItem>
                        <SelectItem value="cad">Dollar canadien (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleSave("langue et région")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Confidentialité</CardTitle>
                <CardDescription>Gérez vos paramètres de confidentialité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visibilité du profil</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profil public</p>
                        <p className="text-sm text-gray-400">Votre profil est visible par tous les utilisateurs</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Afficher l'inventaire</p>
                        <p className="text-sm text-gray-400">Votre inventaire est visible par les autres joueurs</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Afficher les transactions</p>
                        <p className="text-sm text-gray-400">Vos transactions sont visibles par les autres joueurs</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Données et cookies</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cookies analytiques</p>
                        <p className="text-sm text-gray-400">
                          Nous utilisons des cookies pour améliorer votre expérience
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cookies marketing</p>
                        <p className="text-sm text-gray-400">
                          Nous utilisons des cookies pour vous montrer des publicités pertinentes
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Données personnelles</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between">
                      Télécharger mes données
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-red-500 hover:text-red-400 hover:bg-red-900/20"
                    >
                      Supprimer mon compte
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleSave("confidentialité")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "connections" && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Connexions</CardTitle>
                <CardDescription>Gérez vos connexions aux portefeuilles et services externes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Portefeuilles connectés</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-900 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src="/placeholder.svg?height=40&width=40" alt="MetaMask" className="h-10 w-10 mr-4" />
                          <div>
                            <p className="font-medium">MetaMask</p>
                            <p className="text-sm text-gray-400">0x71C7...976F</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Déconnecter
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Wallet className="mr-2 h-4 w-4" />
                    Connecter un nouveau portefeuille
                  </Button>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Services connectés</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-900 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src="/placeholder.svg?height=40&width=40" alt="Discord" className="h-10 w-10 mr-4" />
                          <div>
                            <p className="font-medium">Discord</p>
                            <p className="text-sm text-gray-400">MinecraftPlayer#1234</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Déconnecter
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src="/placeholder.svg?height=40&width=40" alt="Twitter" className="h-10 w-10 mr-4" />
                          <div>
                            <p className="font-medium">Twitter</p>
                            <p className="text-sm text-gray-400">@MinecraftPlayer</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Déconnecter
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Connecter un nouveau service
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleSave("connexions")}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function SettingsNavItem({ icon, title, active, onClick }) {
  return (
    <button
      className={`flex items-center space-x-3 px-4 py-3 w-full text-left transition-colors ${
        active ? "bg-gray-700 text-green-400" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
      {active && <ChevronRight className="h-4 w-4 ml-auto" />}
    </button>
  )
}

