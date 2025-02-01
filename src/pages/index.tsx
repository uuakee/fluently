import { useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface AuthResponse {
  token: string;
  role: 'ADMIN' | 'STUDENT';
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://v1.destinify.com.br/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: AuthResponse = await response.json();
      localStorage.setItem('auth_token', data.token);
      
      // Redireciona baseado no cargo do usuário
      if (data.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      console.error("Falha ao fazer login");
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-brand/5 flex flex-col gap-2 justify-center items-center h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <Image src="/logotype.png" alt="" width={120} height={120} />
      <div>
        <Card className="p-4">
          <CardTitle className="text-2xl">Acesso a plataforma</CardTitle>
          <CardDescription className="w-[300px]">
            Utilize o seu e-mail e senha informada no e-mail institucional para acessar a plataforma.
          </CardDescription>
          <CardContent className="flex flex-col gap-2">
            <Input 
              placeholder="E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              placeholder="Senha" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button 
              className="bg-brand hover:bg-secundarybrand hover:text-black" 
              onClick={handleLogin}
            >
              Acessar
            </Button>
          </CardContent>
          <CardFooter className="p-2 text-xs text-muted-foreground flex items-center gap-1">
            Esqueceu sua senha?<a href="#" className="text-brand"> Clique aqui</a>
          </CardFooter>
        </Card>
        <p className="text-xs flex justify-center text-center mt-2 gap-1 items-center">Copyright © 2025 - Powered by <a href="https://github.com/brunocarvalho" target="_blank" className="text-brand">Fluently</a></p>
      </div>
    </div>
  );
}