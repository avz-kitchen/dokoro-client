/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  // useBreakpointValue,
  // Icon,
} from "@chakra-ui/react";

function AuthForm({
  formType,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  username,
  email,
  password,
  errorMessage,
}) {
  const isSignUp = formType === "signup";

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Plant , grow
            <Text
              as={"span"}
              bgGradient="linear(to-r, green.400,green.400)"
              bgClip="text"
            >
              &
            </Text>
            process your plants
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              {isSignUp ? "Plant your own garden" : "Let's keep on planting"}
              <Text
                as={"span"}
                bgGradient="linear(to-r, green.400,green.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              {isSignUp
                ? "Create an account and start planting your garden. Find plants and discover their power and effects."
                : "Log in to access your garden and manage your plants."}
            </Text>
          </Stack>
          <Box as={"form"} onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleNameChange}
                placeholder="username"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="yourmail@mail.com"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Button
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,green.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, green.400,green.400)",
                  boxShadow: "xl",
                }}
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <Text color={"gray.500"} fontSize={{ base: "xs", sm: "xs" }}>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <Link
                to={isSignUp ? "/login" : "/signup"}
                color={"green.500"}
                fontSize={{ base: "xs", sm: "xs" }}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default AuthForm;
