'use client'
import ColorPicker from "@/components/features/add-tag/ui/color-picker";
import TagForm from "@/components/features/add-tag/ui/tag-form";
import { Badge, Box, Card, Checkbox, ColorSwatch, For, Heading, HStack, Tag } from "@chakra-ui/react";
import { div } from "framer-motion/client";
import TagElement from "./tag-element";
import { useState } from "react";

export default function TaskElement({props}: {props: {
    id: string,
    title: string,
    tags: Tag[]
}})
{

    const [state, setState] = useState(false)

    const handleSubmit = () => {
        setState(!state)
    }

    return (
        <Card.Root size="sm">
            <Card.Header>
                <Heading size="md">Задача № {props.id}</Heading>
            </Card.Header>
            <Card.Body color="fg.muted" flexDir={'row'} justifyContent={'space-between'}>
                <Box textDecoration={state ? 'none' : 'line-through'}>
                    {
                        props.title
                    }
                </Box>
                <Box>
                    <Checkbox.Root  size={'lg'}>
                        <Checkbox.HiddenInput onClick={handleSubmit}/>
                        <Checkbox.Control />
                    </Checkbox.Root>
                </Box>
            </Card.Body>
            <Card.Footer>
                <HStack wrap="wrap">
                    <TagElement tags={props.tags}/>
                    <TagForm task_id={props.id}/>
                </HStack>
            </Card.Footer>
        </Card.Root>
    )
}