'use client'

import { removeTag } from "@/utils/actions"

export default function ButtonTag({tag}: {tag: Tag})
{
    return(
        <div>
            <button onClick={() => removeTag(tag.id)} className="px-3 rounded-sm font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity duration-300" style={{backgroundColor: tag.color}}>{tag.name}</button>
        </div>
    ) 
}