/* eslint-disable no-unused-vars */
import React from "react";
import { SimpleGrid, Box, Container, Stack } from "@chakra-ui/react";

function BodyTwoCol(props) {
  return (
    <React.Fragment>
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>{/*Add Components*/}</Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default BodyTwoCol;
