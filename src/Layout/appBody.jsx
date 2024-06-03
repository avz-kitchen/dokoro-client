// AppBody.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/react";
import Sidebar from "/src/components/Navigation/Sidebar.jsx";

function AppBody() {
  return (
    <React.Fragment>
      <HStack h="calc(100vh - 140px)" w="100%">
        <Sidebar />
        <VStack w="100%" h="100%">
          <Outlet />
        </VStack>
      </HStack>
    </React.Fragment>
  );
}

export default AppBody;
