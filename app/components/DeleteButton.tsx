"use client";

import { Button } from "@/components/ui/button";
import { Deletar } from "../actions";
import { Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Apagar({ id }: { id: number }) {
  const router = useRouter();

  async function del() {
    const confirmed = confirm(`Sério?`);
    if (confirmed) {
      await Deletar(id);
      alert("Tarefa Deletada!");
      router.refresh();
    }
  }

  return (
    <DropdownMenuItem onClick={del} className="cursor-pointer focus:text-red-600 focus:bg-red-50">
      <h1 className="text-red-600 hover:text-red-800">Apagar Sessão</h1>
      <Trash className="h-4 w-4 text-red-600" />
    </DropdownMenuItem>
  );
}
