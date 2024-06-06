/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import {
  Box,
  VStack,
  Center,
  HStack,
  Spacer,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

function AppHeader(props) {
  const isLoggedIn = useContext(AuthContext.isLoggedIn);

  return (
    <VStack
      borderBottom={"1px"}
      borderColor="gray.300"
      w="100%"
      h="100px"
      bg="gray.200"
    >
      <HStack w="100%" h="100%" p="1">
        <Box w="400px" h="100%" bg="pink" rounded="md">
          <Center h="100%">Dokoro</Center>
        </Box>

        <Spacer />
        <Box w="150px" h="100%" align="end" pr="5">
          <SimpleGrid columns={2}>
            {isLoggedIn && <Button>Build Garden</Button>}
          </SimpleGrid>
        </Box>
      </HStack>
    </VStack>
  );
}

export default AppHeader;
