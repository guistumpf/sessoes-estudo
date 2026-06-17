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
import { IoLogoVercel } from "react-icons/io5";
import { RiSupabaseFill } from "react-icons/ri";
import { SiNextdotjs, SiShadcnui, SiLucide, SiTailwindcss, SiBetterauth } from "react-icons/si";
import { TbSourceCode } from "react-icons/tb";
// dentro do componente
export const dynamic = "force-dynamic";
export default function Logout({ id }: { id: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function logout() {
    const confirmed = confirm("Tem certeza que deseja sair?");

    if (confirmed) {
     await logoutAction();
      alert("Sessão encerrada!");
    router.push('/login'); 
    }
  }

  function Limpar() {
    const confirmed = confirm("Tem certeza que deseja apagar tudo? É permanente hein!");

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
                <div className="flex gap-2 items-center">
                  <Info/> <span>Informações</span>         
                </div>
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
              <DialogTitle>Mais um!</DialogTitle>
                 <DialogDescription asChild>
              <div className="text-sm text-muted-foreground">
                <p className="">Mais um crud! :) </p>
                

                <div className="mt-3">
                 Banco de dados fornecido pelo Supabase e Autenticação já no next.js, fornecida pelo Better Auth.
                </div>
                <div className="mt-1 mb-1 text-[10px]">
                *UI feita com Shadcn, Tailwind, React
                  Icons e Lucide
                </div>
                <a
                  href="https://github.com/guistumpf/sessoes-estudo"
                  className="w-fit block"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TbSourceCode
                    className="text-3xl mt-2 mb-2 cursor-pointer"
                    title="Código Fonte"
                  />
                </a>
                <p className="mb-2 mt-2 font-bold">Tecnologias Utilizadas:</p>
                <div className="flex justify-center gap-3">
                  <FaGithub
                    className="text-2xl"
                    title="Github / Github Desktop"
                  />
                  <SiNextdotjs className="text-2xl" title="Next.Js" />
                  <RiSupabaseFill className="text-2xl" title="Supabase" />
                  <SiShadcnui className="text-2xl" title="Shadcn/ui" />
                  <IoLogoVercel className="text-2xl" title="Vercel" />
                  <SiLucide className="text-2xl" title="Lucide Icons" />
                  <SiTailwindcss className="text-2xl" title="Tailwind Css" />
                  <SiBetterauth  className="text-2xl" title="Better Auth"/>
                </div>
              </div>
            </DialogDescription>
            </DialogHeader>
          </DialogContent>

        </Dialog>
      </div>
    ) : null}
  </>
);

}
