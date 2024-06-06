import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";

function Plant() {
  const [plant, setPlant] = useState(null);
  const plantId = useParams();

  const getPlant = () => {
    axios
      .get(`${API_URL}/api/plant/:${plantId}`)
      .then((response) => {
        const plantFromApi = response.data.reverse();
        setPlant(plantFromApi);
      })
      .catch((e) => console.log("error getting plant from API", e));
  };

  useEffect(() => {
    getPlant();
  }, []);

  if (plant === null) {
    return <div className="loader"></div>;
  }

  return <div>{plant.plantName}</div>;
}
export default Plant;
