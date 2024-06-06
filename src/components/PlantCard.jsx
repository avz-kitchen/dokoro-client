/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Card,
  Image,
  HStack,
  Tag,
  Heading,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";

function PlantCard({ plant, season, effect }) {
  return (
    <Card maxW="420px" bg="white" p="6">
      <Heading as="h2" my="2" size="md">
        {plant}
      </Heading>
      <Image
        src="https://justfruitsandexotics.com/wp-content/uploads/placeholder.jpg"
        alt="Parsley Waterfall"
        borderRadius="xl"
        objectFit="cover"
        mx="auto"
      />
      <HStack mt="5" spacing="3">
        {season.map((item) => (
          <Tag key={item} variant="outline">
            {item}
          </Tag>
        ))}
        <Tag as="span">{effect} </Tag>
      </HStack>
      <HStack>
        <Center my="6">
          <Button colorScheme="yellow">Learn more</Button>
          <Button>Save plant</Button>
        </Center>
      </HStack>
    </Card>
  );
}
export default PlantCard;
