'use client'

import { useStore } from "@/utils/store"
import { ColorSwatch, For, HStack } from "@chakra-ui/react"

export default function ColorPicker({setColor}: {setColor: any})
{

    const {color_id, setColorId} = useStore()

    const handle = (color: string) =>{
        console.log("+"+color_id)
        setColorId(color)
        setColor(color)
    }

    return (
        <HStack maxWidth={100} wrap='wrap'> 
            <For each={[
                        "#ffeeec","#ff563f","#fcecfe",
                        "#45c4a5","#e8f8ff","#fff8e0",
                        "#30aee3","#ff9719","#ef83fd",
                        ]}>
                {(color) => 
                    <ColorSwatch 
                    border={color_id == color ? '2px #111111 solid' : 'none'}
                    onClick={() => handle(color)} 
                    key={color} 
                    className="cursor-pointer" 
                    value={color} 
                    size="md" 
                    />
                }
            </For>
        </HStack>
    )
}