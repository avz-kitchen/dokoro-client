/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  VStack,
  Center,
  HStack,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";

function AppHeader(props) {
  return (
    <React.Fragment>
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
            <SimpleGrid columns={2}></SimpleGrid>
          </Box>
        </HStack>
      </VStack>
    </React.Fragment>
  );
}

export default AppHeader;
