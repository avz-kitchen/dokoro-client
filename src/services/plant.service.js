/* eslint-disable no-undef */
import axios from "axios";

class PlantService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });
    }

    createPlant = (requestBody) => {
        return this.api.post("api/plants", requestBody);

    };

    getPlants = () => {
        return this.api.get("api/plants");

    };
    getPlant = (plantId) => {
        return this.api.get(`api/plants/${plantId}`);
    };
    updatePlant = (plantId, updatedData) => {
        return this.api.put(`api/plants/${plantId}`, updatedData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
    }
}
const plantService = new PlantService();


export default plantService;