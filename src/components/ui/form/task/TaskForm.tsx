'use client'
import { useActionState } from "react";
import ButtonAddTask from "./ButtonAddTask";
import InputTask from "./InputTask";
import { createTask } from "@/utils/actions";

const initState = {
    id: "",
    title: "",
}

export default function TaskForm()
{

    const [state, formAction] = useActionState(createTask, initState) 

    return(
        <div>
           <form action={formAction} method="POST">
                <div className="flex items-center">
                    <InputTask/>
                    <ButtonAddTask/>
                </div>
            </form> 
        </div>
    )
}