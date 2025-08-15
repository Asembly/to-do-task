import { auth } from "@/utils/auth";
import React from "react";

export default async function LayoutAuth({children}: {children: React.ReactNode})
{
    const session = await auth()

    return (
        <>
            {children}
        </>
    )
}