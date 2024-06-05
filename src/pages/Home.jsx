import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
function Home() {
  const [plants, setPlants] = useState([]);
  // const [savedPlants, setSavedPlants] = useState([]);

  const userId = useGetUserID();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants`);
        setPlants(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // const fetchSavedPlants = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${API_URL}/plants/savedPlants/ids/${userId}`
    //     );
    //     setSavedPlants(response.data.savedPlants);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    fetchPlants();
    // fetchSavedPlants();
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
    <div>
      <h1>Plants</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant._id}>
            <div>
              <h2>{plant.name}</h2>
              <Link to={`/plants/${plant.id}`} key={plant.id}></Link>
              {/* <button
                onClick={() => savePlant(plant._id)}
                disabled={isPlantSaved(plant._id)}
              >
                {isPlantSaved(plant._id) ? "Saved" : "Save"}
              </button> */}
            </div>
            <div className="instructions">
              <p>{plant.power}</p>
            </div>
            {/* <img src={plant.imageUrl} alt={plant.name} /> */}
            {/* <p>Cooking Time: {plant.cookingTime} minutes</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
