import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import plantService from "../services/plant.service";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Heading,
  Card,
} from "@chakra-ui/react";
function Home() {
  const [plants, setPlants] = useState([]);
  // const [savedPlants, setSavedPlants] = useState([]);

  const userId = useGetUserID();
  useEffect(() => {
    plantService
      .getPlants()
      .then((response) => {
        const plantsFromApi = response.data.reverse();
        setPlants(plantsFromApi);
      })
      .catch((e) => console.log("error getting plants from API", e));
  }, [userId]);
  // const savePlant = async (plantId) => {
  //   try {
  //     const response = await axios.put(`${API_URL}/plants`, {
  //       plantId,
  //       userId,
  //     });
  //     setSavedPlants(response.data.savedPlants);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const isPlantSaved = (id) => savedPlants.includes(id);

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
          <Heading>Plants</Heading>
          {plants.map((plant) => (
            <Card key={plant._id}>
              <div>
                <h2>{plant.plantName}</h2>
                <Link to={`/plants/${plant.id}`} key={plant.id}></Link>
                {/* <button
                onClick={() => savePlant(plant._id)}
                disabled={isPlantSaved(plant._id)}
              >
                {isPlantSaved(plant._id) ? "Saved" : "Save"}
              </button> */}
              </div>
              <div>
                <p>{plant.power}</p>
              </div>
              {/* <img src={plant.imageUrl} alt={plant.name} /> */}
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Home;
