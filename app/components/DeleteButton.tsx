"use client";

import { Button } from "@/components/ui/button";
import { Deletar } from "../actions";
import { Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
export const dynamic = "force-dynamic";

export default function Apagar({ id }: { id: number }) {
  const router = useRouter();

  async function del() {
    const confirmed = confirm(`Tem certeza? Vai perder a sessão e os dados dela`);
    if (confirmed) {
      await Deletar(id);
      alert("Sessão Deletada!");
      router.refresh();
    }
  }

  return (
    <DropdownMenuItem onClick={del} className="group cursor-pointer hover:bg-red-500">
  <h1 className="text-red-600 group-hover:text-white">Apagar Sessão</h1>
  <Trash className="h-4 w-4 text-red-600 group-hover:text-white" />
</DropdownMenuItem>
  );
}
