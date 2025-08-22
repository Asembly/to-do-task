'use client'
import { Button, Field, Input, Popover, Portal, Stack, Textarea } from "@chakra-ui/react";
import ColorPicker from "./color-picker";
import { useRef, useState } from "react";
import { addTag } from "@/utils/actions";

export default function TagForm({task_id}: {task_id: string})
{

    const [color, setColor] = useState("#FFDBB1")
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        
        formData.append("color", color)
        formData.append("taskId", task_id)

        try {
            await addTag({} as any, formData);
            console.log("Тег создан!");
        } catch (error) {
            console.log("Ошибка при создании тега");
        }
    };

    return(
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button size="sm" variant="outline">
                    добавить тэг
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                <Popover.Content>
                    <form ref={formRef} onSubmit={handleSubmit} method="POST">
                        <Popover.Arrow />
                        <Popover.Body>
                        <Stack gap="4">
                            <Field.Root>
                            <Field.Label>Название тэга</Field.Label>
                            <Input name="name" placeholder="название" />
                            </Field.Root>
                            <Field.Root>
                            <Field.Label>Цвет тэга</Field.Label>
                                <ColorPicker setColor={setColor}/>
                            </Field.Root>
                            <Field.Root>
                                <Button type="submit" size="sm">Создать</Button>
                            </Field.Root>
                        </Stack>
                        </Popover.Body>
                        <Popover.CloseTrigger />
                    </form>
                </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}