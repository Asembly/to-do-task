'use server'
import TaskElement from "./TaskElement"
import { getTaskByUserId, getTasks } from "@/utils/actions"

export default async function TaskList() 
{

    const tasks: Task[] = await getTaskByUserId()
    console.log(tasks)

    return (
        <div className="space-y-5 max-h-158 overflow-y-auto overflow-x-clip custom-scrollbar max-sm:max-h-110">
            {
                tasks.map(item => (
                    console.log(item.id),
                    <TaskElement key={item.id} props={{title: item.title, tags: item.tags, id: item.id}}/>
                ))
            }
        </div>
    )
}