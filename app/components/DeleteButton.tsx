"use client"

import { Button } from "@/components/ui/button";
import { Deletar } from "../actions";
import { Trash } from "lucide-react";

export default function Apagar({id}: {id: number}){
    
     async function del() {
    const confirmed = confirm(`Sério?`);
    if (confirmed) {
      await Deletar(id);
      alert("Tarefa Deletada!");
    }
  }
    
    return (
<Button onClick={del}>
<Trash/>
</Button>

    )
    
}