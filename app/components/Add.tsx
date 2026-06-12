"use client";

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
import { useState } from "react";

export default function Add() {

  const [materia, setMateria] = useState("");
  const [materiacustom, setcustom] = useState("");

  const finalMateria = materia === "Outro" ? materiacustom : materia;
  console.log(finalMateria);


  return (
    <div>
      <Dialog
       onOpenChange={(open) => {
  if (!open) {
    setMateria("");
    setcustom("");
  }
}}
      >
        
        <DialogTrigger>Add</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registre uma nova sessão</DialogTitle>
            <DialogDescription>
              <div className="flex gap-1 mt-5">
                <h1 className="text-black">Qual matéria você estudou?</h1>
                <span className="text-red-500">*</span>
              </div>
              <div className="mt-2 text-black">
                <Select value={materia} onValueChange={(value) => {
    setMateria(value);
  }}>
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
                      onChange={(e) => setcustom(e.target.value) }
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <h1 className="text-black mt-6">O seu tempo de estudo</h1> 
              </div>
<div className="flex rounded-sm gap-3 mt-10">
   
   <Input
    placeholder="Max: 24 hours"
    type="number"
    max={24}
    />
<Input/>
</div>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
