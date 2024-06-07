import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Plant() {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/plants/${plantId}`
        );
        setPlant(response.data);
      } catch (e) {
        console.log("Error fetching plant data", e);
      }
    };
    fetchPlant();
  }, [plantId]);

  if (plant === null) {
    return <div className="loader"></div>;
  }

  return <div>{plant.plantName}</div>;
}
export default Plant;
