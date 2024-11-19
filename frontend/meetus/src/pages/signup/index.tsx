import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useAuth} from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nombre requerido" })
      .max(50, { message: "El nombre no debe superar los 50 caracteres" }),
    email: z
      .string()
      .min(1, { message: "Email obligatorio" })
      .email({ message: "Dirección de correo electrónico inválida" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirme su contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"],
  });

function Signup() {
  const {signup} = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const extractPasswordRequirements = (message: string): string => {
    const match = message.match(/\[(.*?)\]/);
    if (match && match[1]) {
      return match[1]
        .split(",")
        .map((req) => req.trim())
        .join(", ");
    }
    return message;
  };

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    const {email, password, name} = values;
    try {
      signup(email, password, name);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code == "auth/password-does-not-meet-requirements") {
        const requirements = extractPasswordRequirements(error.message);
        form.setError("password", {
          type: "custom",
          message: `La contraseña no cumple con los requisitos: ${requirements}`,
        });
      } else if (error.code == "auth/email-already-in-use") {
        form.setError("email", {
          type: "custom",
          message: "Correo electrónico en uso",
        });
      } else {
        console.error(error.message);
        form.setError("password", {
          type: "custom",
          message: "Hubo un error inesperado. Por favor, inténtelo de nuevo.",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Registro</CardTitle>
          <CardDescription>Crea una cuenta para empezar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Ingrese su correo electrónico" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese su contraseña"
                            {...field}
                          />
                          <Button
                            variant="ghost" size="icon"
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-0 top-2/4 -translate-y-2/4"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </Button>
                        </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Vuelva a introducir su contraseña"
                            {...field}
                          />
                        </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                Registrarse
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="underline">
                Inicia sesión
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup
