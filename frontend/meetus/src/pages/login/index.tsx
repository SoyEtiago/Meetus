import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {useAuth} from "../../hooks/useAuth";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: "Email obligatorio"})
    .email({message: "Dirección de correo electrónica inválida"}),
    password: z
    .string()
    .min(1, {message: "Contraseña obligatoria"})
    .min(8, {message: "La contraseña debe tener al menos 8 caracteres"})
})

function Login() {
  const {login, loginWithGoogle} = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const {email, password} = values;
    try {
      login(email, password);
      navigate('/dashboard');
    } catch (error: any) { 
      console.log(error.message);
    }
  }

  const handleGoogleSignIn = async () => {
    const user = await loginWithGoogle()
  }


  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <CardHeader>
          <CardTitle className="text-2xl">Inicio de Sesión</CardTitle>
          <CardDescription>
          Introduzca su dirección de correo electrónico para acceder a su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su correo electrónico" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Ingrese su contraseña" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
              </form>
            </Form>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Iniciar sesión con Google
            </Button>
            <div className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="underline">
                Regístrate
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login