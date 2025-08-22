'use client'
import { removeTag } from "@/utils/actions";
import { HStack, Tag } from "@chakra-ui/react";
import { button, div } from "framer-motion/client";

export default function TagElement({tags}: {tags: Tag[]})
{
    return (
        <HStack>
         {
            tags.map(item => (
                <Tag.Root key={item.id} backgroundColor={item.color} color="black">
                    <Tag.Label>{item.name}</Tag.Label>
                    <Tag.EndElement>
                            <Tag.CloseTrigger onClick={() => removeTag(item.id)} className="cursor-pointer"/>
                    </Tag.EndElement>
                </Tag.Root>
            ))
        }
        </HStack>
    )
}