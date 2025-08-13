'use client'
import ButtonTagList  from "@/components/ui/task/tag/ButtonTagList"
import CheckBoxTask from "@/components/ui/task/CheckBoxTask"
import { useStore } from "@/utils/store/tag/store"
import { useState } from "react"
import TagForm from "../form/tag/TagForm"

export default function TaskElement({props}: {props: Task})
{
    const [ isFinish, setFinish ] = useState(false)
    const [ state, setState ] = useState()

    return (
        <div className="hover:bg-black/3 p-1 transition-colors duration-500">
            <div className="flex space-x-5 items-center justify-between font-medium">
                <div style={{textDecoration: isFinish ? "line-through": ""}}>
                    {props.title}
                </div>
                <div>
                    <CheckBoxTask setFinish={setFinish}/>
                </div>
            </div>
            <div className="">
                <ButtonTagList tags={props.tags} state={state} setState={setState}/>
            </div>
            {state ?  
                <TagForm taskId={props.id}/>
                :""
            }
            
        </div>
    )
}