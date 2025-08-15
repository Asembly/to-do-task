'use client'
import { InputTag } from "./InputTag";
import ButtonAddTask from "../task/ButtonAddTask";
import ColorSelect from "./ColorSelect";
import ButtonAddTag from "./ButtonAddTag";
import { useActionState, useRef, useState } from "react";
import { createTag } from "@/utils/actions";

const initState = {
    id: "",
    title: "",
    tags: [] 
}

export default function TagForm({taskId}: {taskId: string})
{
    const [color, setColor] = useState("#FFDBB1")
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        
        formData.append("color", color)
        formData.append("taskId", taskId)
        console.log(color)
        console.log(taskId)

        try {
            await createTag(initState, formData);
            console.log("Тег создан!");
        } catch (error) {
            console.log("Ошибка при создании тега");
        }
    };

    return(
        <div>
           <form ref={formRef} onSubmit={handleSubmit} method="POST">
                <div className="flex flex-col justify-center space-y-2 pt-2">
                    <div>
                        <ColorSelect setColor={setColor}/>
                    </div>
                    <div className="flex">
                        <InputTag/>
                        <ButtonAddTag/>
                    </div>
                </div>
            </form> 
        </div>
    )
}