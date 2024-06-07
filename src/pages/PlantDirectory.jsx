import { useEffect, useState, lazy, Suspense } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import gardenService from "../services/plant.service";

function PlantDirectory() {
  const [plants, setPlants] = useState([]);
  const PlantCard = lazy(() => import("/src/components/PlantCard.jsx"));
  const { plantId } = useParams();
  useEffect(() => {
    gardenService.getPlants().then((response) => setPlants(response.data));
  }, []);

  return (
    <Box>
      <SimpleGrid>
        {plants.map((plant) => (
          <Link to={`/plants/${plantId}`} key={plant._id}>
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
