import {
  Card,
  CardAction,
  CardContent,
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
import { db } from "../db";
import Add from "./Add";
import Apagar from "./DeleteButton";

export default async function Card1() {
  const nar = await db.execute(sql`SELECT * FROM "Sessoes"`);

  const sessoes = nar as unknown as Array<{
    id: number;
    materia: string;
    created_at: number;
    anotacoes: string;
    tempo: number;
  }>;

  return (
    <>
      <h1 className="text-3xl font-bold flex justify-center mt-4">
        Sessões de Estudo
      </h1>
      <h1 className="flex justify-center mt-1 text-[15px] text-zinc-400 text-center">
        O que você estudou hoje?
      </h1>
      <Add />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-3xl mx-auto px-4 w-1000">
        {sessoes.map(({ id, materia, created_at, anotacoes, tempo }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{materia}</CardTitle>
              <CardAction>{formatarData(created_at)}</CardAction>
            </CardHeader>
            <CardContent>
              <p>
                {formatTempo(tempo)} <Apagar id={id} />
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger>
                  <h1 className="truncate max-w-[200px]">{anotacoes}</h1>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Anotações</DialogTitle>
                    <DialogDescription>{anotacoes}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
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
