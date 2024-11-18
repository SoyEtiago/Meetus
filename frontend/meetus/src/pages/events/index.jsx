import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import  {useNavigate} from "react-router-dom"

export function EventPage() {
  const navigate = useNavigate()
  const events = [
    {
      id: 1,
      title: "Eat corn on the cob",
      location: "Austin, TX",
      date: "Jan 6",
      time: "5:00 PM",
      attendees: 34,
      attendeeAvatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    {
      id: 2,
      title: "Tomorrowland",
      location: "Austin, TX",
      date: "Jan 6",
      time: "5:00 PM",
      attendees: 34,
      attendeeAvatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    {
      id: 3,
      title: "We The Medicine",
      location: "Austin, TX",
      date: "Jan 6",
      time: "5:00 PM",
      attendees: 34,
      attendeeAvatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
  ]

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-4 mb-4 mx-4 justify-between">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Eventos destacados</h2>
        </div>
        <Button onClick={() => navigate('/dashboard/events/new')} >Crea tu propio evento</Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full gap-4">
          {events.map((event) => (
            <Card key={event.id} className="w-[300px] shrink-0">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {event.attendeeAvatars.map((avatar, i) => (
                        <Avatar key={i} className="border-2 border-background">
                          <AvatarImage src={avatar} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} friends are going</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="w-full" variant="outline">
                      Maybe
                    </Button>
                    <Button className="w-full">Going</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}