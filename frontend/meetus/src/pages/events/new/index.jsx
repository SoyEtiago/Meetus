import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns";
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, MapPin } from "lucide-react"
import { axiosInstance } from '../../../config/axios/axiosIntance';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../hooks/useAuth"



export function NewEventPage() {
  const {user} = useAuth();
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventDate, setEventDate] = useState()
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post("/events/new", {
        nombre: eventName,
        organizadorId: String(user.uid),
        descripcion: eventDescription,
        fecha: eventDate,
        hora: eventTime,
        lugar: eventLocation,
      });

      setAlert({
        type: "success",
        title: "Evento Creado",
        description: response.data.message || "El evento se creó correctamente.",
      });

      // Resetear los campos
      setEventName("");
      setEventDescription("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");

      // Redirigir después de un timeout
      setTimeout(() => {
        // Redirigir al dashboard
        navigate("/dashboard/events");
      }, 5000);
    } catch (error) {
      console.error("Error al crear el evento:", error);

      // Mostrar alerta de error
      setAlert({
        type: "error",
        title: "Error al Crear Evento",
        description: error.response?.data?.message || "Ocurrió un problema. Inténtalo de nuevo.",
      });
    }
  }

  return (
    <div>

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
        {/* Alertas */}
        {alert && (
          <div
            className={`fixed top-4 right-4 z-50 px-8 py-4 rounded-lg shadow-xl bg-opacity-95 transition-all duration-500 ease-in-out transform ${
              alert.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <AlertTitle className="font-extrabold text-xl">{alert.title}</AlertTitle>
            <AlertDescription className="text-base mt-2">{alert.description}</AlertDescription>
          </div>
        )}


    </div>
  )
}