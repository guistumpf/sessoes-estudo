"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Atualizar } from "../actions";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Check, Pencil, X } from "lucide-react";
interface EditProps {
  id: number;
  materiaAtual: string;
  anotacoesAtual: string;
  tempoAtual: number;
}



export default function Edit({
  id,
  materiaAtual,
  anotacoesAtual,
  tempoAtual,
}: EditProps) {
  const horasIniciais = Math.floor(tempoAtual / 60);
  const minutosIniciais = tempoAtual % 60;

  const [materia, setMateria] = useState(materiaAtual);
  const [anotacoes, setanota] = useState(anotacoesAtual);
  const [minutos, setmin] = useState<number | "">(minutosIniciais);
  const [horas, sethoras] = useState<number | "">(horasIniciais);
  const [aberto, setaberto] = useState(false);
  const router = useRouter();

  const realhoras = (horas as number) * 60;
  const legal = (minutos as number) + realhoras;

  async function Enviar() {
    if (legal <= 0) {
      alert("Você veio aqui pra tentar dizer que estudou menos de um minuto? .-.");
      return;
    } else if (legal > 1439) {
      alert("Legal que você tá editando, mas vc não estudou por um dia :)");
      return;
    }

    if (materia.trim() === "") {
      alert("Tá tentando deixar sem matéria? Mais fácil excluir a sessão");
      return;
    }

    if ((minutos as number) > 59) {
      alert("BLEHHHH, recusado. Minutos tem que ser só até 59");
      return;
    }

 if (materia.length > 25) {
      alert("Máximo de 25 caracteres permitido, não tente quebrar a UI :(");
      return;
    }
  
    

    await Atualizar(id, materia.trim(), anotacoes.trim(), legal);
    alert("Sessão atualizada!");
    setaberto(false);
    router.refresh();
  }

  function confirmar() {
    const confirmed = confirm(
      "Tem certeza? Todas as alterações serão canceladas",
    );

    if (confirmed) {
      setaberto(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={setaberto}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
          <h1 className="flex gap-2">
            Editar Sessão <Pencil />
          </h1>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faça Edições a sua sessão!</DialogTitle>
          <DialogDescription>
            <div className="flex gap-1 mt-5">
              <h1 className="text-black font-semibold">Matéria</h1>
              <span className="text-red-500">*</span>
            </div>
            <Input
              className="mt-2 w-[200px]"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
            />

            <div className="flex gap-1 mt-7 ml-0.5">
              <h1 className="text-black font-semibold">Tempo de estudo</h1>
              <span className="text-red-500">*</span>
            </div>

            <div className="flex gap-3 mt-2">
              <div className="flex flex-col">
                <label className="text-sm ml-1 text-black mb-1">Horas</label>
                <Input
                  type="number"
                  max={24}
                  placeholder="Max: 23h"
                  className="rounded-sm p-2"
                  value={horas}
                  onChange={(e) =>
                    sethoras(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                />
              </div>

              <div className="flex flex-col">
                <div className="flex gap-1">
                  <label className="text-sm ml-1 text-black mb-1">
                    Minutos
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  type="number"
                  max={59}
                  placeholder="Max: 59m"
                  className="rounded-sm p-2"
                  value={minutos}
                  onChange={(e) =>
                    setmin(e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="mt-5 ml-1">
              <h1 className="text-black ml text-md mb-2 font-medium">
                Anotações
              </h1>
              <Textarea
                value={anotacoes}
                onChange={(e) => setanota(e.target.value)}
              />
            </div>
            <div className="flex flex-row-reverse content-right gap-1">
              <Button
                onClick={Enviar}
                className="mt-4 bg-green-800 hover:bg-green-700"
              >
                <Check />
              </Button>
              <Button onClick={confirmar} className="mt-4">
                <X />
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
