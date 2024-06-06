import axios from "axios";

class GardenService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });
    }

    // Create a new garden
    createGarden = (gardenData) => {
        return this.api.post("/gardens", gardenData);
    };

    // Get all gardens
    getGardens = () => {
        return this.api.get("/gardens");
    };

    // Get a specific garden by ID
    getGarden = (gardenId) => {
        return this.api.get(`/gardens/${gardenId}`);
    };

    // Update a specific garden by ID
    updateGarden = (gardenId, updatedGardenData) => {
        return this.api.put(`/gardens/${gardenId}`, updatedGardenData);
    };

    // Delete a specific garden by ID
    deleteGarden = (gardenId) => {
        return this.api.delete(`/gardens/${gardenId}`);
    };
}

const gardenService = new GardenService();

export default gardenService;
