import { Input } from "@/components/ui/input";

type envios = {
   placeholder: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: number | string
    type?: string
}


export default function Inputs({placeholder, value, type, onChange}: envios) {
return <Input 
value={value}
placeholder={placeholder}
onChange={onChange}
type={type}
/>
}
