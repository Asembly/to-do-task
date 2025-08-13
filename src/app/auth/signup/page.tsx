'use client'

import SignUpForm from "@/components/ui/form/auth/SignUpForm"
import { useSession } from "next-auth/react"

export default function SignUp()
{
    return(
        <div>
            <SignUpForm></SignUpForm>
        </div>
    ) 
}