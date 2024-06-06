/* eslint-disable no-unused-vars */
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import AppBody from "/AppBody";
import AppFooter from "./AppFooter";

function AppLayout(props) {
  return (
    <React.Fragment>
      <Box w="100%">
        <Flex w="100%">
          <AppBody />
        </Flex>
        <AppFooter />
      </Box>
    </React.Fragment>
  );
}

export default AppLayout;
