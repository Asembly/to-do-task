'use client'

import { useState } from "react"

export default function CheckBoxTask({setFinish}: {setFinish: any})
{

    const [state, setState] = useState(false)

    const handle = () => {
        setState(!state)
        setFinish(!state)
    }

    return (
        <div>
            <button onClick={handle} style={{background:state ? "#7CC455" : ""}} className="bg-black/10 w-5 h-5 hover:bg-isfinish cursor-pointer border-2 border-black/10"></button>
        </div>
    )
}