import Link from "next/link";
import InputField from "./InputField";
import ButtonAuth from "./ButtonAuth";
import { useState } from "react";
import { signIn } from "next-auth/react";

// const initState: User = {
//     id: "",
//     username: "",
//     email: "",
//     tasks: []
// }

export default function LoginForm()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", { username, password, callbackUrl: "/" }); 
    };

    return (
        <div className="pt-50">
            <form onSubmit={handleSubmit} method="post" className="space-y-5 flex-col flex text-center">
                <InputField value={username} setValue={setUsername} name="username" type="text"/>
                <InputField value={password} setValue={setPassword} name="password" type="password"/>
                <div>
                    Invalid Username
                </div>
                <ButtonAuth text="авторизоваться"/>
                <div>
                    Нет аккаунта?    
                    <br />
                    <Link href={"/auth/signup"} className="text-buttontask hover:text-buttontask/50">Регистрация</Link>
                </div>
            </form>
        </div>
    )
}