/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Card,
  Image,
  HStack,
  Tag,
  Heading,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PlantCard({ plant, season, effect }) {
  return (
    <Card maxW="420px" bg="white" p="6">
      <Heading as="h2" my="2" size="md">
        {plant.plantName}
      </Heading>
      <Image
        src="https://justfruitsandexotics.com/wp-content/uploads/placeholder.jpg"
        alt="Parsley Waterfall"
        borderRadius="xl"
        objectFit="cover"
        mx="auto"
      />
      <HStack mt="5" mb="5" spacing="3">
        {season.map((item) => (
          <Tag key={item} variant="outline">
            {item}
          </Tag>
        ))}
        <Tag as="span">{effect} </Tag>
      </HStack>
      <Spacer />
      <Link to={`/plants/${plant._id}`}>
        <Button bgColor="yellow.400">Learn more</Button>
      </Link>
      {/* <Button>Save plant</Button> */}
    </Card>
  );
}
export default PlantCard;
