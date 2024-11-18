import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns";
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, MapPin } from "lucide-react"

export function NewEventPage() {
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventDate, setEventDate] = useState()
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      eventLocation,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Crea tu propio evento</h1>
      
      <div className="space-y-2">
        <Label htmlFor="eventName">Nombre del evento</Label>
        <Input
          id="eventName"
          placeholder="Ingresa el nombre del evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventDescription">Descripción del evento</Label>
        <Textarea
          id="eventDescription"
          placeholder="Describe tu evento"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !eventDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {eventDate ? format(eventDate, "PPP") : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={eventDate}
                onSelect={setEventDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventTime">Hora</Label>
          <div className="relative">
            {/* Input con tipo time */}
            <input
              id="eventTime"
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              onFocus={(e) => e.target.showPicker()} // Activa el selector al hacer clic en cualquier parte del input
              required
              className=" w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventLocation">Lugar</Label>
        <div className="relative">
          <Input
            id="eventLocation"
            placeholder="Ingresa el lugar del evento"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
          <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Button type="submit" className="w-full">Crea el evento</Button>
    </form>
  )
}