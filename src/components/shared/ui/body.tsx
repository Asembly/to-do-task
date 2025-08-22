import TaskList from "@/components/widgets/ui/task-list";
import { Box, Container, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Body()
{
    return (
        <Box> 
            <Suspense fallback={<Spinner/>}>
                <TaskList/>
            </Suspense>
        </Box>
    )
}