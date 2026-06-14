"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Entrar</h1>

      <Button onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/" })}>
        Entrar com Discord
      </Button>
    </div>
  );
}