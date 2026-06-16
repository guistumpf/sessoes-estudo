"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { user } from "@/auth-schema";
import { Info, LogOut } from "lucide-react";
import { Clear, logoutAction } from "../actions";
// dentro do componente

export default function Logout({id}: {id: number}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  function logout() {
    const confirmed = confirm("Tem certeza que deseja sair?");

    if (confirmed) {
      logoutAction();
      alert("Sessão encerrada!");
      router.refresh();
    }
  }

  function Limpar() {
    const confirmed = confirm("Tem certeza que deseja apagar tudo? É permane");

    if (confirmed) {
      Clear(id);
      router.refresh();
    }
  }

  return (
    <>
      {session ? (
        <div className="flex justify-end px-4 pt-4 pb-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-sm">
                <span className="font-bold">{session.user.name}</span>
                <Image
                  src={session.user.image as string}
                  width={25}
                  height={25}
                  alt="Picture of the author"
                  className="rounded-4xl"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded">
              
              <DropdownMenuItem onClick={Limpar} className="cursor-pointer">
                <LogOut color="red" />
                <span className="text-red-500">Sair</span>
              </DropdownMenuItem>
             
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut color="red" />
                <span className="text-red-500">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </>
  );
}
