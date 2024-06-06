import { useEffect, useState, lazy, Suspense, Link } from "react";
import { Box, SimpleGrid, Heading, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import plantService from "../services/plant.service";

function PlantDirectory() {
  const [plants, setPlants] = useState([]);
  const PlantCard = lazy(() => import("../components/PlantCard"));
  const plantId = useParams();
  useEffect(() => {
    plantService
      .getPlants()
      .then((response) => {
        const plantsFromApi = response.data.reverse();
        setPlants(plantsFromApi);
      })
      .catch((e) => console.log("error getting plants from API", e));
  }, []);

  return (
    <Box>
      <Heading>Plant Directory</Heading>
      <Button as={Link} to="/plant-new">
        Add new plant
      </Button>
      <SimpleGrid>
        {plants.map((plant) => (
          <Link to={`/plants/:${plantId}`} key={plant.id}>
            <Suspense fallback={<div>Loading...</div>}>
              <PlantCard
                key={plant.id}
                plant={plant.plantName}
                season={plant.season}
                effect={plant.effect}
              ></PlantCard>
            </Suspense>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default PlantDirectory;
