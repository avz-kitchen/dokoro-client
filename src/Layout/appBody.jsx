// AppBody.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import Sidebar from "/src/components/Navigation/Sidebar.jsx";

function AppBody() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <React.Fragment>
      <HStack h="calc(100vh - 140px)" w="100%">
        <Sidebar />
        <VStack w="100%" h="100%">
          <Box w="100%" p={4} bg="gray.200">
            <Text fontSize="lg" color="gray.600">
              {currentDate}
            </Text>
          </Box>
          <Outlet />
        </VStack>
      </HStack>
    </React.Fragment>
  );
}

export default AppBody;
