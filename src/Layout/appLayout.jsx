/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useTitle } from "../context/title.context";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AppBody from "./appBody.jsx";
import AppFooter from "./appFooter.jsx";
import AppHeader from "./appHeader";
import Sidebar from "../components/Navigation/Sidebar";
function AppLayout() {
  const location = useLocation();
  const onPage = location.pathname;
  const { title } = useTitle();
  return (
    <Box w="100%">
      <AppHeader title={title} onPage={onPage} />
      <Flex w="100%">
        <Sidebar />
        <AppBody />
      </Flex>
      <AppFooter />
    </Box>
  );
}

export default AppLayout;
