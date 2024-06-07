/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Card, Image, HStack, Tag, Heading, Spacer } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import GardenModal from "./GardenModal";
// import { useState } from "react";
function PlantCard({ plant, season, effect }) {
  console.log(plant);
  // const [showModal, setShowModal] = useState(false);
  // const handleAddToGarden = () => {
  //   setShowModal(true);
  // };
  return (
    <Card maxW="420px" bg="white" p="6" mb="5">
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
      <HStack mt="5" mb="5" spacing="3">
        {season.map((item) => (
          <Tag as="span" key={item} variant="outline" display="flex">
            {item}
          </Tag>
        ))}
      </HStack>
      {effect.map((item) => (
        <Tag as="span" key={item} variant="outline">
          {item}
        </Tag>
      ))}
      <Spacer />
      {/* <Link to={`/plants/${plant._id}`}>
        <Button bgColor="yellow.400" mt="5">
          Learn more
        </Button>
      </Link>
      <Button onClick={handleAddToGarden}>Save plant</Button>
      {showModal && (
        <GardenModal
          plant={plant}
          gardens={gardens}
          onClose={() => setShowModal(false)}
        />
      )} */}
    </Card>
  );
}
export default PlantCard;
