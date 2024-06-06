/* eslint-disable no-undef */
import axios from "axios";

class PlantService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });
    }

    createPlant = (requestBody) => {
        return this.api.post("/plants", requestBody);

    };

    getPlants = () => {
        return this.api.get("/plants");

    };
    getPlant = (plantId) => {
        return this.api.get(`/plants/:${plantId}`);
    };
    updatePlant = (plantId, updatedData) => {
        return this.api.put(`/plants/:${plantId}`, updatedData);
    }
}
const plantService = new PlantService();


export default plantService;