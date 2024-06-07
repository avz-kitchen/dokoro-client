/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import plantService from "../services/plant.service.js";

const GardenContext = createContext();

function GardenProviderWrapper({ children }) {
  const [plants, setPlants] = useState([]);

  const getPlants = () => {
    plantService
      .getPlants()
      .then((response) => {
        setPlants(response.data);
      })
      .catch((err) => {
        console.error("Error fetching plants", err);
      });
  };

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <GardenContext.Provider value={{ plants, getPlants }}>
      {children}
    </GardenContext.Provider>
  );
}

export { GardenProviderWrapper, GardenContext };
