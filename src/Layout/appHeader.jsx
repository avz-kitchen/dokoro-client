/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useTitle } from "../context/title.context";
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
  Text,
} from "@chakra-ui/react";

function AppHeader({ onPage, title }) {
  const { isLoggedIn } = useContext(AuthContext);
  const currentDate = new Date().toLocaleDateString();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return (
    <VStack w="100%" h="40px" marginBottom={2}>
      <HStack w="100%" h="100%" p="4">
        <Box w="100" h="100%" rounded="md">
          <Center h="100%">Dokoro</Center>
        </Box>
        <Spacer />
        <Center>
          <Heading as="h1" size="lg">
            {title}
          </Heading>
        </Center>
        <Spacer />

        <HStack>
          {isLoggedIn && onPage === "/gardens" && (
            <Button
              as={Link}
              to="/garden-new"
              bgColor="green.400"
              _hover={{
                bgGradient: "linear(to-r, green.400,yellow.400)",
                boxShadow: "xl",
              }}
            >
              New Garden
            </Button>
          )}
          {isLoggedIn && onPage === "/plants" && (
            <Button
              as={Link}
              to="/plant-new"
              _hover={{
                bgGradient: "linear(to-r, yellow.400,green.400)",
                boxShadow: "xl",
              }}
            >
              New Plant
            </Button>
          )}
          <Text fontSize="lg" color="gray.600">
            {currentDate}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}

export default AppHeader;
