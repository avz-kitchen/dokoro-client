/* eslint-disable no-unused-vars */
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import AppHeader from "/AppHeader";
import AppBody from "/AppBody";
import AppFooter from "./AppFooter";

function AppLayout(props) {
  return (
    <React.Fragment>
      <Box w="100%">
        <AppHeader w="100%" h="100px" />
        <Flex w="100%" bg="blue.200">
          <AppBody />
        </Flex>
        <AppFooter />
      </Box>
    </React.Fragment>
  );
}

export default AppLayout;
