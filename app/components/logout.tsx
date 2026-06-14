
"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import Image from 'next/image'
// dentro do componente

export default function Logout(){
    
    const router = useRouter();
    const { data: session } = authClient.useSession();
    
    function logout(){
        const confirmed = confirm("Tem certeza que deseja sair?")
        if(confirmed)
            authClient.signOut()
        router.refresh()
       router.push('/login');
}

    return <>
    
    {session ?
<div>
        <Button onClick={logout}>Sair  <Image
        src={session.user.image as string}
        width={500}
        height={500}
        alt="Picture of the author"
        /></Button>
        </div>
        
        : null}
    </>
}