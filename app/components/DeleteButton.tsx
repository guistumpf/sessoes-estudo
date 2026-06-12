"use client"

import { Button } from "@/components/ui/button";
import { Deletar } from "../actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Apagar({id}: {id: number}){
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
<Button onClick={del}>
<Trash/>
</Button>

    )
    
}