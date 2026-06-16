"use server";
import { account } from "@/app/db/schema"; // Ajuste o nome "account" caso sua tabela tenha outro nome no schema
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { get } from "http";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Não autenticado");
  return session.user.id;
}

export async function Adicionar(
  materia: string,
  anotacoes: string,
  tempo: number,
) {
  const userId = await getUserId();
  const add = await db.execute(
    sql`INSERT INTO "Sessoes" (materia, anotacoes, tempo, user_id) VALUES (${materia}, ${anotacoes}, ${tempo}, ${userId})`,
  );
}

export async function Deletar(id: number) {
  const userId = await getUserId();
  const del = await db.execute(
    sql`DELETE FROM "Sessoes" WHERE id=${id} AND user_id=${userId}`,
  );
}

export async function Atualizar(
  id: number,
  materia: string,
  anotacoes: string,
  tempo: number,
) {
  const userId = await getUserId();
  const upd = await db.execute(
    sql`UPDATE "Sessoes" SET materia=${materia}, anotacoes=${anotacoes}, tempo=${tempo} WHERE id=${id} AND user_id=${userId}`,
  );
}

export async function Clear(id: number) {
const userId = await getUserId()
const limpar = await db.execute(sql`DELETE FROM "Sessoes" WHERE user_id=${userId}`)

}



export async function logoutAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  try {
    const userAccount = await db.query.account.findFirst({
      where: eq(account.userId, userId),
    });

    if (
      userAccount &&
      userAccount.providerId === "github" &&
      userAccount.accessToken
    ) {
      const credentials = btoa(
        `${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`,
      );

      await fetch(
        `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/grant`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            access_token: userAccount.accessToken,
          }),
        },
      );
    }
  } catch (error) {
    console.error("Erro ao revogar permissão no GitHub:", error);
  }

  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/login");
}
