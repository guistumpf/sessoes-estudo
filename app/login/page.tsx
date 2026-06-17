"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "../components/theme";

export default function LoginPage() {
  return (
 
 <>
 <div className="min-h-[100dvh]">

  <div className="fixed bottom-4 right-4 z-50">
    <ModeToggle />
  </div>

  <div className="h-screen w-full flex flex-col bg-backgr ound overflow-x-hidden">
    
    {/* TOPO */}
    <div className="pt-4 text-center px-4">
      <h1 className="text-2xl font-bold text-foreground">
        Tracking de Estudos
      </h1>
      <p className="text-[12px] text-zinc-500 mt-1">
        Registre suas sessões de estudo
      </p>
    </div>

    {/* CENTRO */}
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl rounded-sm border border-[#121212] bg-card w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-foreground">
              Entre com sua conta do Github
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Button
              className="w-full rounded-none bg-black text-white hover:bg-[#d0d0d0] hover:text-black transition"
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/",
                })
              }
            >
              Entrar com Github <FaGithub />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* FOOTER */}
    <div className="pb-4 text-xs text-zinc-500 text-center">
      Serviço de autenticação oferecido por{" "}
      <a
        href="https://better-auth.com/"
        className="underline text-zinc-500 hover:text-black dark:hover:text-white"
      >
        Better Auth
      </a>
    </div>
  </div>
 </div>
</>
  );
}
