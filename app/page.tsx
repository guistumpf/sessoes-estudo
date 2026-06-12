import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db } from "./db"
import { sql } from "drizzle-orm"


export default async function Page() {

const oi = await db.execute(sql`SELECT * FROM "Sessoes"`)


  return 


}
