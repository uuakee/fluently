import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
            <Input placeholder="E-mail" className=""/>
            <Input placeholder="Senha" className="" />
            <Button className="bg-brand hover:bg-secundarybrand hover:text-black">Acessar</Button>
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
