'use client'
import { logout } from "@/utils/actions"
import { useSession } from "next-auth/react"

export default function ButtonOut(){

    const { data:session } = useSession()

    console.log(session?.refreshToken)

    return(
        <div>
            <button onClick={() => logout(session?.refreshToken)} className="bg-signout px-3 py-1 text-sm rounded-sm cursor-pointer hover:bg-black/30 transition-color duration-300" type="submit">выйти</button>
        </div>
    )
}