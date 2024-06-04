import { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";

function PlantDirectory() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("/api/plants");
        const plantsData = response.data;
        setPlants(plantsData);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h1>Plant Directory</h1>
      <div>
        <h2>Plants List</h2>
        <SimpleGrid>
          <ul>
            {plants.map((plant) => (
              <li key={plant.id}>
                {plant.name} - {plant.season}
              </li>
            ))}
          </ul>
        </SimpleGrid>
      </div>
    </div>
  );
}
export default PlantDirectory;
