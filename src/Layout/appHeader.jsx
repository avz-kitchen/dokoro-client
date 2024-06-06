/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import {
  Box,
  VStack,
  Center,
  HStack,
  Spacer,
  SimpleGrid,
  Button,
  Heading,
} from "@chakra-ui/react";

function AppHeader({ onPage }) {
  const { isLoggedIn } = useContext(AuthContext);

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
          <Heading as="h1" size="lg"></Heading>
          <SimpleGrid columns={2}>
            {isLoggedIn && onPage === "/gardens" && (
              <Button as={Link} to="/garden-new">
                New Garden
              </Button>
            )}
            {isLoggedIn && onPage === "/plants" && (
              <Button as={Link} to="/plant-new">
                New Plant
              </Button>
            )}{" "}
          </SimpleGrid>
        </Box>
      </HStack>
    </VStack>
  );
}

export default AppHeader;
