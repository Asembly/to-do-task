'use client'
import { signOut } from "next-auth/react"

export default function ButtonOut(){
    return(
        <div>
            <button onClick={() => signOut()} className="bg-signout px-3 py-1 text-sm rounded-sm cursor-pointer hover:bg-black/30 transition-color duration-300" type="submit">выйти</button>
        </div>
    )
}