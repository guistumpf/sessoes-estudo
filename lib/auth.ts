import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/db";
import * as schema from "@/app/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // troca pra "mysql" ou "sqlite" se não for postgres
    schema,
  }),
  socialProviders: {
       github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});