import { getTaskByUserId } from "@/utils/actions";
import { Card, Heading, Stack, TableScrollArea } from "@chakra-ui/react";
import TaskElement from "./task-element";

export default async function TaskList()
{

    const tasks: Task[] = await getTaskByUserId()

    return (
        <Stack overflowY='auto' maxH="700px">
            {
                tasks.map(item => (
                   <TaskElement key={item.id} props={{
                        id: item.id,
                        title: item.title,
                        tags: item.tags
                    }}/>
                ))
            }
        </Stack>
    )
}