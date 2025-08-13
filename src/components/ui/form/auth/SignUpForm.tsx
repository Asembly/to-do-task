import Link from "next/link";
import ButtonSignUp from "./ButtonAuth";
import InputField from "./InputField";
import { createUser } from "@/utils/actions";
import { useActionState } from "react";
import ButtonAuth from "./ButtonAuth";

const initState: User = {
    id: "",
    username: "",
    email: "",
    tasks: []
}

export default function SignUpForm()
{
    const [action, formAction] = useActionState(createUser, initState)

    return (
        <div className="pt-50">
            <form action={formAction} method="post" className="space-y-5 flex-col flex text-center">
                <InputField name="username" type="text"/>
                <InputField name="email" type="email"/>
                <InputField name="password" type="password"/>
                <div>
                    Invalid Username
                </div>
                <ButtonAuth text="зарегестрироваться"/>
                <div>
                    Уже есть аккаунт?    
                    <br />
                    <Link href={"/auth/login"} className="text-buttontask hover:text-buttontask/50">Логин</Link>
                </div>
            </form>
        </div>
    )
}