import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
function PlantGarden() {
  const userId = useGetUserID();
  const [garden, setGarden] = useState({
    title: "",
    gardener: userId,
    description: "",
    location: "",
    plants: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { title, value } = e.target;
    setGarden({ ...garden, [title]: value });
  };

  const handlePlantChange = (e, index) => {
    const { value } = e.target;
    const plants = [...garden.plants];
    plants[index] = value;
    setGarden({ ...garden, plants });
  };

  const handleAddPlant = () => {
    const plants = [...garden.plants, ""];
    setGarden({ ...garden, plants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/gardens`, { ...garden });

      alert("Garden Planted");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-garden">
      <h2>Plant Garden</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="name"
          name="title"
          value={garden.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={garden.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="plants">Plants</label>
        {garden.plants.map((plant, index) => (
          <input
            key={index}
            type="text"
            name="plants"
            value={plant}
            onChange={(e) => handlePlantChange(e, index)}
          />
        ))}
        <button type="button" onClick={handleAddPlant}>
          Add Plant
        </button>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={garden.location}
          onChange={handleChange}
        />
        <button type="submit">Plant Garden</button>
      </form>
    </div>
  );
}

export default PlantGarden;
