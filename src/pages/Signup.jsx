/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {
  Box,
  Flex,
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

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    async function signup() {
      try {
        await authService.signup(requestBody).then((response) => {
          navigate("/login");
        });
      } catch (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
    signup();
  };

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
              Plant your own garden
              <Text
                as={"span"}
                bgGradient="linear(to-r, green.400,green.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Create an account and start planting your garden. Find plants and
              discover their power and effects.
            </Text>
          </Stack>
          <Box as={"form"} onSubmit={handleSignupSubmit}>
            <Stack spacing={4}>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
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
                onChange={handleEmail}
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
                onChange={handlePassword}
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
                Sign Up
              </Button>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <Text color={"gray.500"} fontSize={{ base: "xs", sm: "xs" }}>
                Already have account?
              </Text>
              <Link
                to={"/login"}
                color={"green.500"}
                fontSize={{ base: "xs", sm: "xs" }}
              >
                {" "}
                Login
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Signup;
