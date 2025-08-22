'use client'
import { signUp } from "@/utils/actions";
import { Box, Button, Field, Input, Link, Stack, Text, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

export default function SignIn()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await signIn("credentials", { username, password, redirect: true ,callbackUrl: "/" }); 
    };

    return(
        <form onSubmit={handleSubmit}>
            <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }} >
                <Field.Root orientation="horizontal">
                    <Field.Label>Username</Field.Label>
                    <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user" flex="1" />
                </Field.Root>

                <Field.Root orientation="horizontal">
                    <Field.Label>Password</Field.Label>
                    <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" flex="1" />
                </Field.Root>

                <Field.Root orientation="horizontal">
                    <Button type="submit" className="w-full">Авторизоваться</Button>
                </Field.Root>

                <Field.Root orientation="horizontal" flexDirection={'row'} justifyContent={'center'}>
                    <Text>
                        нет аккаунта? {" "} 
                        <Link
                            variant="underline"
                            href="/sign-up"
                            colorPalette="teal"
                        >
                            зарегистрироваться
                        </Link>
                    </Text>
                </Field.Root>
            </Stack>
        </form>
    )
}