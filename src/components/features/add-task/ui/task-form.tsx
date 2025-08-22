'use client'
import { addTask } from "@/utils/actions";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useActionState } from "react";

export default function TaskForm()
{

    const [_, formAction] = useActionState(addTask, {} as any)

    return (
        <div>
           <form action={formAction} method="POST">
                <Flex>
                    <Input type="text" name="title" placeholder="Название сегодняшней задачи" size="lg" />
                    <Button type="submit" size="lg">Добавить</Button>
                </Flex>
            </form> 
        </div>
    )
}