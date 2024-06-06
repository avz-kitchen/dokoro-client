import { useState, useContext, useEffect } from "react";
import { useTitle } from "../context/title.context";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import gardenService from "../services/garden.service";
import { Box, Heading, Button, Input, Textarea, Card } from "@chakra-ui/react";

function PlantGarden() {
  const { user } = useContext(AuthContext);
  const { gardenId } = useParams();
  const { setTitle } = useTitle();

  const [garden, setGarden] = useState({
    title: "",
    gardener: user._id,
    description: "",
    location: "",
    plants: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (gardenId) {
      // Fetch the garden details for editing
      gardenService
        .getGarden(gardenId)
        .then((response) => setGarden(response.data))
        .catch((error) => console.error("Error fetching garden:", error));
    }
  }, [gardenId, setTitle]);

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

  const handleAddPlant = (e, index) => {
    setGarden((prevGarden) => {
      const updatedPlants = [...prevGarden.plants];
      updatedPlants[index] = e.target.value;
      return { ...prevGarden, plants: updatedPlants };
    });
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
      if (gardenId) {
        await gardenService.updateGarden(gardenId, garden);
        alert("Garden Updated");
      } else {
        await gardenService.createGarden(garden);
        alert("Garden Planted");
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
      <Heading>{gardenId ? "Edit Garden" : "New Garden"}</Heading>
      <br />
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        id="name"
        name="title"
        value={garden.title}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="description">Description</label>
      <Textarea
        id="description"
        name="description"
        value={garden.description}
        onChange={handleChange}
      ></Textarea>
      <br />
      <label htmlFor="plants">Plants</label>
      {garden.plants.map((plant, index) => (
        <Card key={index}>
          <Input
            key={index}
            type="text"
            name="plants"
            value={plant}
            onChange={(e) => handlePlantChange(e, index)}
          />
          <Button type="button" onClick={() => handleDeletePlant(index)}>
            Delete
          </Button>
        </Card>
      ))}
      <Button type="Button" onClick={handleAddPlant}>
        Add Plant
      </Button>
      <label htmlFor="location">Location</label>
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
