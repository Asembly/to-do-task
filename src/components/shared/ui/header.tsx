import LogoutBtn from "@/components/features/auth/logout-btn";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Header()
{

    return (
        <Box className="flex items-center justify-between">
                <Text textShadow={'0px 5px 4px white'}>
                    <Heading size='xl'>
                            To-Do Task
                    </Heading>
                </Text>
            <LogoutBtn/>
        </Box>
    )
}