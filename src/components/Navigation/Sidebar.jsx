/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "/src/context/auth.context";
import { Link } from "react-router-dom";
import { Text, VStack, Button } from "@chakra-ui/react";

import { Flex, IconButton, Divider, Heading } from "@chakra-ui/react";
import { FiMenu, FiHome, FiTable } from "react-icons/fi";
import { PiPlant } from "react-icons/pi";

import NavItem from "./NavItem";

function Sidebar() {
  const [size, setSize] = useState(250);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <React.Fragment>
      <VStack
        h="100%"
        w={size + "px"}
        style={{ minWidth: size + "px", maxWidth: size + "px" }}
      >
        <Flex
          pos="sticky"
          left="5"
          h="95vh"
          marginTop="2.5vh"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          borderRadius={size == "small" ? "15px" : "30px"}
          w={size == "small" ? "75px" : "200px"}
          flexDir="column"
          justifyContent="space-between"
        >
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={size == "small" ? "center" : "flex-start"}
            as="nav"
          >
            <IconButton
              background="none"
              mt={5}
              _hover={{ background: "none" }}
              icon={<FiMenu />}
              onClick={() => {
                if (size == "small") setSize("large");
                else setSize("small");
              }}
            />
            <NavItem size={size} icon={FiHome} title="Home" path="/" />
            {isLoggedIn && (
              <div>
                <NavItem
                  size={size}
                  icon={FiTable}
                  title="Garden"
                  path="/gardens"
                  description="Plant in your garden"
                  active
                />
                <NavItem
                  size={size}
                  icon={PiPlant}
                  title="Plants"
                  description="Plant Directory"
                  path="/plants"
                />
              </div>
            )}
          </Flex>

          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={size == "small" ? "center" : "flex-start"}
            mb={4}
          >
            <Divider display={size == "small" ? "none" : "flex"} />
            <Flex mt={4} align="center">
              <Flex
                flexDir="column"
                ml={4}
                display={size == "small" ? "none" : "flex"}
              >
                <Heading as="h3" size="sm"></Heading>
                {isLoggedIn && (
                  <>
                    <Text color="gray">{user.name}</Text>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <Link to="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </VStack>
    </React.Fragment>
  );
}
export default Sidebar;
