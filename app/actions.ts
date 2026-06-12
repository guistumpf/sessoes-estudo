"use server"

import { sql } from "drizzle-orm";
import { db } from "./db";

export async function Adicionar(materia: string, anotacoes: string, tempo: number){
    const add = await db.execute(sql`INSERT INTO "Sessoes" (materia, anotacoes, tempo) VALUES (${materia}, ${anotacoes}, ${tempo})`)
}

export async function Deletar(id: number) {
    const del = await db.execute(sql`DELETE FROM "Sessoes" WHERE id=${id}`)
    
}