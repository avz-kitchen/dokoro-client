import { useEffect, useState, Suspense } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import plantService from "../services/plant.service";
import { Link } from "react-router-dom";
import { useTitle } from "../context/title.context";
import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import PlantCard from "../components/PlantCard";

function Home() {
  const [plants, setPlants] = useState([]);
  // const [savedPlants, setSavedPlants] = useState([]);
  const userId = useGetUserID();
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Home");

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
      <Wrap spacing={{ base: 10, md: 20 }}>
        {plants.map((plant) => (
          <WrapItem key={plant._id}>
            {plant._id && (
              <Link to={`/plants/${plant._id}`}>
                <Suspense fallback={<div>Loading...</div>}>
                  <PlantCard
                    key={plant.id}
                    plant={plant.plantName}
                    season={plant.season}
                    effect={plant.effect}
                  ></PlantCard>
                </Suspense>
              </Link>
            )}
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default Home;

//{
/* <button
                onClick={() => savePlant(plant._id)}
                disabled={isPlantSaved(plant._id)}
              >
                {isPlantSaved(plant._id) ? "Saved" : "Save"}
              </button> */
//}
//{
/* <img src={plant.imageUrl} alt={plant.name} /> */
//}
