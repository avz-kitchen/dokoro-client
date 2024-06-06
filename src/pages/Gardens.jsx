import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Heading,
  Card,
  Text,
  Button,
  Center,
  HStack,
  Badge,
  Square,
  VStack,
} from "@chakra-ui/react";

function Gardens() {
  const [gardens, setGardens] = useState(null);

  const getGardens = () => {
    axios
      .get(`${API_URL}/api/gardens`)
      .then((response) => {
        const gardensFromApi = response.data.reverse();
        setGardens(gardensFromApi);
      })
      .catch((e) => console.log("error getting gardens from API", e));
  };

  useEffect(() => {
    getGardens();
  }, []);

  if (gardens === null) {
    return <div className="loader"></div>;
  }

  return (
    <Box position={"relative"} spacing={{ base: 10, lg: 32 }}>
      <HStack>
        <Flex>
          <VStack>
            <Heading>My Gardens</Heading>
            <Text>Number of gardens: {gardens?.length}</Text>
          </VStack>
          <Button as={Link} to="/garden-new">
            Build garden
          </Button>
        </Flex>
      </HStack>

      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
      >
        {gardens?.map((garden, id) => {
          return (
            <Card
              key={id}
              spacing={{ base: 1, lg: 32 }}
              maxW="420px"
              bg="white"
              p="6"
            >
              <Link to={`/gardens/:${garden._id}`} key={id}>
                <Square
                  bg="brand.700"
                  borderRadius="base"
                  minW="240px"
                  minH="160px"
                >
                  <Heading as="h3" size="md" color="brand.900">
                    {garden.title}
                  </Heading>
                </Square>
                <br />

                <HStack>
                  <Text as="p" fontSize="xs" color="grey">
                    Plants:
                  </Text>
                  <Badge as="span" color="green.800" fontSize="md">
                    {garden.plant?.length ?? 0}
                  </Badge>
                  <Text as="p" fontSize="xs" color="grey">
                    Location:
                  </Text>
                  <Badge as="span" color="green.800" fontSize="md">
                    {garden.location}
                  </Badge>
                </HStack>
                <Center my="6">
                  <Button color="green.800">Go to Garden</Button>
                </Center>
              </Link>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
}

export default Gardens;
