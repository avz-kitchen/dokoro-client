/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Flex, Text, Icon } from "@chakra-ui/react";

function NavItem({ icon, title, size, path }) {
  return (
    <Link to={path} style={{ textDecoration: "none", width: "100%" }}>
      <Flex
        mt={5}
        flexDir="row"
        w="100%"
        gap={3}
        align={"center"}
        p={3}
        _hover={{ bg: "gray.100", borderRadius: "md" }}
      >
        <Icon as={icon} fontSize="xl" />
        <Text mt={2} display={size === "small" ? "none" : "flex"}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
}

export default NavItem;
