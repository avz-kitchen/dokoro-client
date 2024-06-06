/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { TitleProvider, useTitle } from "../context/title.context";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppBody from "././appBody.jsx";
import AppFooter from "./appFooter.jsx";
import AppHeader from "././appHeader";

function AppLayout() {
  const location = useLocation();
  const onPage = location.pathname;

  return (
    <TitleProvider>
      <LayoutContent onPage={onPage} />
    </TitleProvider>
  );
}
function LayoutContent() {
  const { title } = useTitle();

  return (
    <React.Fragment>
      <Box w="100%">
        <AppHeader title={title} />
        <Flex w="100%">
          <AppBody />
        </Flex>
        <AppFooter />
      </Box>
    </React.Fragment>
  );
}

export default AppLayout;
