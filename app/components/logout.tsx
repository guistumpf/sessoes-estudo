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
import { Info, LogOut, TriangleAlert } from "lucide-react";
import { Clear, logoutAction } from "../actions";
import { FaGithub } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
// dentro do componente

export default function Logout({ id }: { id: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      alert("Sessões Apagadas!");
      router.refresh();
    }
  }


return (
  <>
    {session ? (
      <div className="flex justify-end px-4 pt-4 pb-2 shrink-0">
        {/* Envolvemos a estrutura no Dialog controlado */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-sm text-sm">
                <span className="font-bold ">{session.user.name}</span>
                <Image
                  src={session.user.image as string}
                  width={25}
                  height={25}
                  alt="Picture of the author"
                  className="rounded-4xl"
                />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="rounded text-xs">
              
              {/* Evento preventDefault evita que o Dropdown intercepte o clique e feche tudo */}
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
                className="cursor-pointer"
              >
                <span>Info</span>         
              </DropdownMenuItem>

              <DropdownMenuItem onClick={Limpar} className="cursor-pointer">
                <TriangleAlert className="text-amber-500 dark:text-yellow-400" />
                <span className="text-yellow-500">Limpar Sessões</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut color="red" />
                <span className="text-red-500">Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently
                delete your account and remove your data from our
                servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>

        </Dialog>
      </div>
    ) : null}
  </>
);

}
