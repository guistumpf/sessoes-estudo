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


export default function Page() {


  return <>
    <h1 className="text-3xl text-bold flex justify-center mt-4">Sessões de Estudo</h1>
    <h1 className="flex justify-center mt-1 text-[15px] text-zinc-400 text-center">Confira suas sessões aqui!</h1>



    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-3xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Física</CardTitle>
          <CardAction>20/08/2025</CardAction>
        </CardHeader>
        <CardContent>
          <p>4 horas</p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger>
              <h1 className="truncate max-w-[200px]">
                vsafsfdfbhggfhfduhfuisuahfofsmafsmfksmkfas
              </h1>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      
    </div>
  </>


}
