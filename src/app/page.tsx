import LayoutTask from "@/components/common/LayoutTask"
import ButtonOut from "@/components/ui/form/auth/ButtonOut"
import ButtonUsers from "@/components/ui/form/auth/ButtonUsers"
import TaskForm from "@/components/ui/form/task/TaskForm"
import TaskList from "@/components/ui/task/TaskList"
import Link from "next/link"

export default function Home()
{
    return(
        <LayoutTask>
            <div className="flex flex-col justify-around h-screen w-1/2 max-sm:w-screen max-sm:px-10">
                <div className="flex justify-between items-center max-sm:gap-5 max-sm:flex-col-reverse">
                    <div>
                        <div className="text-center text-2xl font-semibold">
                            To-Do Task
                        </div>
                        <div className="italic text-black/50">
                            by <span>
                                <Link className="text-blue-500 hover:text-blue-800" href={"http://t.me/asmblly"}>
                                    @asembly
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <ButtonUsers/>
                        <ButtonOut/>
                    </div>
                </div>
                <TaskList></TaskList>
                <TaskForm></TaskForm>
            </div>
        </LayoutTask>        
    ) 
}