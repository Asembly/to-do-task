import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LayoutAuth({children}: {children: React.ReactNode})
{
    const session = await auth()
    if(!session)
    {
        redirect("/auth/login")
    }
    return (
        <>
            {children}
        </>
    )
}