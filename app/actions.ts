"use server"

import { sql } from "drizzle-orm";
import { db } from "./db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Não autenticado");
  return session.user.id;
}

export async function Adicionar(materia: string, anotacoes: string, tempo: number){
    const userId = await getUserId();
    const add = await db.execute(sql`INSERT INTO "Sessoes" (materia, anotacoes, tempo, user_id) VALUES (${materia}, ${anotacoes}, ${tempo}, ${userId})`)
}

export async function Deletar(id: number) {
    const userId = await getUserId();
    const del = await db.execute(sql`DELETE FROM "Sessoes" WHERE id=${id} AND user_id=${userId}`)
    
}

export async function Atualizar(id: number, materia: string, anotacoes: string, tempo: number) {
    const userId = await getUserId();
    const upd = await db.execute(sql`UPDATE "Sessoes" SET materia=${materia}, anotacoes=${anotacoes}, tempo=${tempo} WHERE id=${id} AND user_id=${userId}`)
}
