import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sql } from "drizzle-orm";
import { db } from "./db";
import Add from "./components/Add";
import Apagar from "./components/DeleteButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Moon, Sun } from "lucide-react";
import Edit from "./components/Edit";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import Logout from "./components/logout";
import { ModeToggle } from "./components/theme";

export default async function Card1() {
  async function getUserId() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Não autenticado");
    return session.user.id;
  }

  const userId = await getUserId();

  const nar = await db.execute(
    sql`SELECT * FROM "Sessoes" WHERE user_id=${userId} ORDER BY id DESC`,
  );

  const sessoes = nar as unknown as Array<{
    id: number;
    materia: string;
    created_at: number;
    anotacoes: string;
    tempo: number;
  }>;

  return (
    <>
 <div className="flex flex-col min-h-[100dvh] overflow-hidden w-full relative">
  <div className="fixed bottom-4 right-4 z-50">
    <ModeToggle />
  </div>

  {/* Logout fixo no topo direito só no desktop */}
  <div className="hidden md:block fixed top-1 right-1">
    <Logout id={111110} />
  </div>

  {/* Logout no mobile (fluxo normal) */}
  <div className="md:hidden">
    <Logout id={111110} />
  </div>

  {/* Header centralizado */}
  <div className="flex flex-col items-center mt-4 w-full">
    <h1 className="text-3xl font-bold text-center">
      Sessões de Estudo
    </h1>
    <h1 className="mt-1 text-[15px] text-zinc-400 text-center">
      O que você estudou hoje?
    </h1>
    <Add />
  </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-3xl mx-auto px-4 w-1000">
          {sessoes.map(({ id, materia, created_at, anotacoes, tempo }) => (
            <Card key={id}>
              <CardHeader className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <CardTitle className="line-clamp-3 break-words">
                    {materia}
                  </CardTitle>
                  <CardDescription>{formatarData(created_at)}</CardDescription>
                </div>
                <CardAction className="flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <Edit
                          id={id}
                          materiaAtual={materia}
                          anotacoesAtual={anotacoes}
                          tempoAtual={tempo}
                        />
                        <Apagar id={id} />
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-base">{formatTempo(tempo)}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  {anotacoes === "" ? (
                    <p className="text-zinc-500">Sem anotações</p>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs font-medium">Anotações</p>
                        <DialogTrigger>
                          <h1 className="truncate max-w-[200px] mt-2">
                            {anotacoes}
                          </h1>
                        </DialogTrigger>
                      </div>
                    </>
                  )}

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Anotações - {materia}</DialogTitle>
                      <span>{formatarData(created_at)}</span>
                      <DialogDescription>{anotacoes}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

function formatTempo(totalMinutos: number) {
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  const partes: string[] = [];
  if (horas > 0) partes.push(`${horas}h`);
  if (minutos > 0 || horas === 0) partes.push(`${minutos}min`);

  return partes.join(" ");
}

function formatarData(timestamp: string | number | Date) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
