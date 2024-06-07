import { useState, useContext, useEffect } from "react";
import { useTitle } from "../context/title.context";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import gardenService from "../services/garden.service";
import plantService from "../services/plant.service";
import {
  FormLabel,
  Box,
  Heading,
  Button,
  Input,
  Textarea,
  Card,
  Select,
} from "@chakra-ui/react";

function PlantGarden() {
  const { user } = useContext(AuthContext);
  const { gardenId } = useParams();
  console.log("Garden ID:", gardenId);
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const [garden, setGarden] = useState({
    title: "",
    gardener: user?._id || "",
    description: "",
    location: "",
    plants: [],
  });

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    setTitle("New Garden");
    if (gardenId) {
      // Fetch the garden details for editing
      gardenService
        .getGarden(gardenId)
        .then((response) => {
          setGarden(response.data);
        })

        .catch((error) => console.error("Error getting garden:", error));
    }
    getPlants();
  }, [gardenId, setTitle]);

  const getPlants = () => {
    plantService
      .getPlants()
      .then((response) => {
        setPlants(response.data);
      })
      .catch((error) => console.error("Error getting plants:", error));
  };

  const handleChange = (e) => {
    setGarden((prevGarden) => ({
      ...prevGarden,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlantChange = (e, index) => {
    const { value } = e.target;
    const plants = [...garden.plants];
    plants[index] = value;
    setGarden({ ...garden, plants });
  };

  const handleAddPlant = () => {
    setGarden((prevGarden) => ({
      ...prevGarden,
      plants: [...prevGarden.plants, ""],
    }));
  };
  const handleDeletePlant = (index) => {
    setGarden((prevGarden) => ({
      ...prevGarden,
      plants: prevGarden.plants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gardenData = {
        ...garden,
        plants: garden.plants || [],
      };
      if (gardenId) {
        await gardenService.updateGarden(gardenId, gardenData);
        alert("Garden Updated");
      } else {
        const response = await gardenService.createGarden(gardenData);
        alert("Garden Planted");
        navigate(`/gardens/${response.data._id}`);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteGarden = async () => {
    try {
      await gardenService.deleteGarden(gardenId);
      alert("Garden Deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Heading as="h2" size="md">
        {gardenId ? `${garden.title}` : "Plant a new Garden"}
      </Heading>
      <br />
      <FormLabel htmlFor="title">Title</FormLabel>
      <Input
        type="text"
        id="name"
        name="title"
        value={garden.title}
        onChange={handleChange}
      />
      <br />
      <FormLabel htmlFor="description">Description</FormLabel>
      <Textarea
        id="description"
        name="description"
        value={garden.description}
        onChange={handleChange}
      ></Textarea>
      <br />
      <FormLabel htmlFor="plants">Plants</FormLabel>
      {garden.plants.map((plant, index) => (
        <Card key={index}>
          <Select value={plant} onChange={(e) => handlePlantChange(e, index)}>
            <option value="">Select a plant</option>
            {plants.map((plant) => (
              <option key={plant._id} value={plant.plantName}>
                {plant.plantName}
              </option>
            ))}
          </Select>
          <Button type="button" onClick={() => handleDeletePlant(index)}>
            Delete
          </Button>
        </Card>
      ))}
      <Button type="Button" onClick={handleAddPlant}>
        Add Plant
      </Button>
      <FormLabel htmlFor="location">Location</FormLabel>
      <Input
        type="text"
        id="location"
        name="location"
        value={garden.location}
        onChange={handleChange}
      />
      <Button type="submit">
        {gardenId ? "Update Garden" : "Build Garden"}
      </Button>
      {gardenId && (
        <Button type="button" onClick={handleDeleteGarden}>
          Delete Garden
        </Button>
      )}
    </Box>
  );
}

export default PlantGarden;
