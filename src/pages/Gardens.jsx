import { useState, useEffect } from "react";
import { useTitle } from "../context/title.context";
import gardenService from "../services/garden.service";
import { Link } from "react-router-dom";
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
  Spacer,
} from "@chakra-ui/react";
function Gardens() {
  // const { user } = useContext(AuthContext);
  const [gardens, setGardens] = useState(null);
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("My Gardens");
    gardenService
      .getGardens()
      .then((response) => {
        console.log("Response from getGardens:", response); // Log the entire response
        setGardens(response); // Set all gardens from the response
      })
      .catch((error) => {
        console.error("Error fetching gardens:", error); // Log any errors
      });
  }, []);

  if (gardens === null) {
    return (
      <Button as={Link} to="/plant-garden">
        Plant your first Garden
      </Button>
    );
  }

  return (
    <Box position={"relative"} spacing={{ base: 10, lg: 32 }}>
      <HStack>
        <Flex>
          <VStack></VStack>
          {/* <Button as={Link} to="/garden-new">
            New garden
          </Button> */}
        </Flex>
      </HStack>

      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
      >
        {gardens &&
          gardens.map((garden) => {
            return (
              <Card
                key={garden._id}
                spacing={{ base: 1, lg: 32 }}
                maxW="420px"
                bg="white"
                p="6"
              >
                <Link to={`/gardens/${garden._id}`}>
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
      <Spacer></Spacer>
      <Text>Number of gardens: {gardens?.length}</Text>
    </Box>
  );
}

export default Gardens;
