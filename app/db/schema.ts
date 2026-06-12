import {
  pgTable,
  bigint,
  timestamp,
  text,
  uuid,
  date,
} from "drizzle-orm/pg-core";

// schema.ts
export const Sessoes = pgTable("Sessoes", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  materia: text("materia").notNull(),
  anotacoes: text("anotacoes").notNull(),
  tempo: bigint("tempo", { mode: "number" }),
});
