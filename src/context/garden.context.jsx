/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import gardenService from "../services/garden.service.js";
import { AuthContext } from "../context/auth.context";

const GardenContext = createContext();

function GardenProviderWrapper({ children }) {
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const getGardens = async () => {
    try {
      const response = await gardenService.getGardens();
      setGardens(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching gardens", error);
    }
  };

  useEffect(() => {
    getGardens();
  }, [user]);

  return (
    <GardenContext.Provider value={{ gardens, isLoading, getGardens }}>
      {children}
    </GardenContext.Provider>
  );
}

export { GardenProviderWrapper, GardenContext };
