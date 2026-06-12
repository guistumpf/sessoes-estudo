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
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Adicionar } from "../actions";
import { useRouter } from "next/navigation";

export default function Add() {
  const [materia, setMateria] = useState("");
  const [materiacustom, setcustom] = useState("");
  const [anotacoes, setanota] = useState("");
  const [minutos, setmin] = useState(0);
  const [horas, sethoras] = useState(0);
  const [aberto, setaberto] = useState(false);
  const router = useRouter();

  const finalMateria = materia === "Outro" ? materiacustom : materia;
  console.log(finalMateria);

  const realhoras = horas * 60;
  const legal = minutos + realhoras;

  async function Enviar() {
    if (legal <= 0) {
      alert("Você não estudo nem 1 minuto? Tenebroso :(");
      return;
    } else if (legal > 1439) {
      alert("Você estudou um dia inteiro?! Vai socializar cara");
      return;
    }

    if (finalMateria === "") {
      alert(
        "Selecione ou escreva uma matéria! Como você vai saber o que estudou?",
      );
      return;
    }

    await Adicionar(finalMateria, anotacoes.trim(), legal);
    alert("Sessão enviada!");
    setaberto(false);
    setMateria("");
    setcustom("");
    sethoras(0);
    setmin(0);
    router.refresh();
  }

  return (
    <div>
      <Dialog
        open={aberto}
        onOpenChange={(newOpen) => {
          setaberto(newOpen);
          if (!newOpen) {
            setMateria("");
            setcustom("");
            sethoras(0);
            setmin(0);
          }
        }}
      >
        <DialogTrigger>Add</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registre uma nova sessão</DialogTitle>
            <DialogDescription>
              <div className="flex gap-1 mt-5">
                <h1 className="text-black font-semibold">Qual matéria você estudou?</h1>
                <span className="text-red-500">*</span>
              </div>
              <div className="mt-2 text-black">
                <Select
                  value={materia}
                  onValueChange={(value) => {
                    setMateria(value);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecione sua Matéria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Exatas</SelectLabel>
                      <SelectItem value="Matématica">Matématica</SelectItem>
                      <SelectItem value="Física">Física</SelectItem>
                      <SelectItem value="Química">Química</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Ciências Humanas</SelectLabel>
                      <SelectItem value="Artes">Artes</SelectItem>
                      <SelectItem value="História">História</SelectItem>
                      <SelectItem value="Sociologia">Sociologia</SelectItem>
                      <SelectItem value="Filosofia">Filosofia</SelectItem>
                      <SelectItem value="Geografia">Geografia</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Ciências Biológicas</SelectLabel>
                      <SelectItem value="Biologia">Biologia</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Linguagens</SelectLabel>
                      <SelectItem value="Português">Português</SelectItem>
                      <SelectItem value="Inglês">Inglês</SelectItem>
                      <SelectItem value="Espanhol">Espanhol</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Outros</SelectLabel>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {materia == "Outro" ? (
                  <div className="mt-4 mb-5">
                    <div className="flex gap-1">
                      <h1>O que você estudou?</h1>
                      <p className="text-red-500">*</p>
                    </div>
                    <Input
                      placeholder="Escreve aqui!"
                      className="mt-2 w-[200px]"
                      value={materiacustom}
                      onChange={(e) => setcustom(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex gap-1 mt-7 ml-0.5">
                <h1 className="text-black font-semibold">Tempo de estudo</h1><span className="text-red-500">*</span>
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
                    onChange={(e) => sethoras(e.target.valueAsNumber)}
                  />
                </div>

               
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <label className="text-sm ml-1 text-black mb-1">
                      Minutos
                    </label>{" "}
                    <span className="text-red-500">*</span>
                  </div>
                  <Input
                    type="number"
                    max={59}
                    placeholder="Max: 59m"
                    className="rounded-sm p-2"
                    value={minutos}
                    onChange={(e) => setmin(e.target.valueAsNumber)}
                  />
                </div>
              </div>

              <div className="mt-5 ml-1">
                <h1 className="text-black ml text-md mb-2 font-medium">Anotações</h1>
                <Textarea
                  placeholder="Conteúdo abordado, Anotações, Lembretes e etc..."
                  value={anotacoes}
                  onChange={(e) => setanota(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button onClick={Enviar} className="w-full mt-4">
                  Adicionar Sessão
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
