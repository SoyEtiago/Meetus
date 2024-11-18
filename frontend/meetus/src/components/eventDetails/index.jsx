import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Music, Ticket } from 'lucide-react'

export default function EventDetails() {
  const [activeTab, setActiveTab] = useState("about")

  const artists = [
    "The Melodic Mavericks",
    "Quantum Beats",
    "Neon Nightingales",
    "Cosmic Crescendo",
    "Synth Sirens",
    "Acoustic Alchemy",
    "Electric Echo",
    "Harmonic Haze",
    "Rhythm Rebels",
    "Sonic Stardust"
  ]

  const ticketTypes = [
    { name: "General Admission", price: "$150" },
    { name: "VIP Pass", price: "$300" },
    { name: "Weekend Camping", price: "$250" },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative h-64 rounded-lg overflow-hidden mb-6">
        <img 
          src="/placeholder.svg?height=400&width=800" 
          alt="SoundWave Festival" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">SoundWave Festival 2024</h1>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>August 15-17, 2024</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>Harmony Fields, Musicville</span>
          </div>
        </div>
        <Button>Get Tickets</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <Card>
            <CardContent className="pt-6">
              <p>
                SoundWave Festival is a three-day music extravaganza featuring top artists from around the world. 
                Set in the beautiful Harmony Fields, this event promises an unforgettable experience of music, 
                art, and community. From pulsating electronic beats to soulful acoustic performances, 
                SoundWave has something for every music lover.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lineup">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artists.map((artist, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Music className="h-5 w-5 text-muted-foreground" />
                    <span>{artist}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tickets">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {ticketTypes.map((ticket, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Ticket className="h-5 w-5 text-muted-foreground" />
                      <span>{ticket.name}</span>
                    </div>
                    <div>
                      <span className="font-bold">{ticket.price}</span>
                      <Button size="sm" className="ml-4">Buy</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}