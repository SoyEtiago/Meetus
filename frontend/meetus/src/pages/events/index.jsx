import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import  {useNavigate} from "react-router-dom"
import { axiosInstance } from "../../config/axios/axiosIntance"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "../../hooks/useAuth"
import { toast } from 'react-toastify';

export function EventPage() {
  const {user} = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/events/all'); 
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegistration = async (eventoId) => {
    try {
      const response = await axiosInstance.get(`/users/${user.uid}`);
      const userData = response.data;
      const usuarioId = userData.usuario._id;
  
      await axiosInstance.post('/events/register-attendee', {
        eventoId,
        usuarioId,
      });
  
      setIsDialogOpen(false);
  
      toast.success("¡Te has registrado exitosamente!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      const errorMessage =
        e.response && e.response.data && e.response.data.message
          ? e.response.data.message
          : "Ocurrió un error al registrarte. Intenta nuevamente.";
  
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleOpenDialog = (eventId) => {
    setSelectedEventId(eventId);
    setIsDialogOpen(true);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-4 mb-4 mx-4 justify-between">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Eventos destacados</h2>
        </div>
        <Button onClick={() => navigate('/dashboard/events/new')} >Crea tu propio evento</Button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event, key) => {
            // console.log(event._id," : ",key)
            return (
            <Card key={event._id} className="w-full">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.hora}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.lugar}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold">{event.nombre}</h3>
                  <Separator/>
                  <p>{event.descripcion}</p>
                  <div className="flex gap-2 flex-wrap">
                    {/* <Button className="w-full" variant="outline">
                      Hablar con organizador
                    </Button> */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <div className="w-full flex justify-end">
                        <DialogTrigger asChild>
                          <Button onClick={() => handleOpenDialog(event._id)}>
                            Registrarse
                          </Button>
                        </DialogTrigger>
                      </div>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Confirmar registro</DialogTitle>
                          <DialogDescription>
                            Regístrate al evento sin precedentes.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleRegistration(selectedEventId); // Usar el ID seleccionado
                            }}
                          >
                            <Button type="submit">Registrarse</Button>
                          </form>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>)
          })}
        </div>
      </div>


    </div>
  )
}