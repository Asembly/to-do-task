import Body from "@/components/shared/ui/body";
import Footer from "@/components/shared/ui/footer";
import Header from "@/components/shared/ui/header";
import { Box, Flex } from "@chakra-ui/react";

export default function Home() {

    return (
        <Box className="flex justify-center" height="full">
          <Flex justifyContent="space-between" width="full" paddingY="10" direction="column" gap="5">
              <Header/>
              <Body/>
              <Footer/>
          </Flex>
        </Box>
    )
}
