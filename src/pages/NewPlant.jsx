import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

function NewPlant() {
  const [plant, setPlant] = useState({
    plantName: "",
    sciName: "",
    season: [],
    sow: [""],
    nutrient: [],
    effect: [],
    power: [],
    grow: "",
    part: [""],
  });

  const [seasons, setSeasons] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [effects, setEffects] = useState([]);
  const [powers, setPowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants`);
        const plants = response.data;
        setSeasons(extractValues(plants, "season"));
        setNutrients(extractValues(plants, "nutrient"));
        setEffects(extractValues(plants, "effect"));
        setPowers(extractValues(plants, "power"));
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchEnums();
  }, []);

  const extractValues = (plants, key) => {
    const valuesSet = new Set();
    plants.forEach((plant) => {
      if (plant[key]) {
        plant[key].forEach((value) => valuesSet.add(value));
      }
    });
    return Array.from(valuesSet);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({ ...plant, [name]: value });
  };

  const handleMultiChange = (e, name) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPlant({ ...plant, [name]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/plants`, { ...plant });
      alert("Plant Added");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-plant">
      <h2>Add a new plant</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plantName">Name</label>
        <input
          type="text"
          id="plantName"
          name="plantName"
          value={plant.plantName}
          onChange={handleChange}
        />
        <label htmlFor="sciName">Scientific Name</label>
        <input
          type="text"
          id="sciName"
          name="sciName"
          value={plant.sciName}
          onChange={handleChange}
        />
        <label htmlFor="season">Season</label>
        <select
          id="season"
          name="season"
          size="4"
          multiple
          value={plant.season}
          onChange={(e) => handleMultiChange(e, "season")}
        >
          {seasons.map((season) => (
            <option key={season} value={season.toLowerCase()}>
              {season}
            </option>
          ))}
        </select>
        <label htmlFor="nutrient">Nutrient</label>
        <select
          id="nutrient"
          name="nutrient"
          size="4"
          multiple
          value={plant.nutrient}
          onChange={(e) => handleMultiChange(e, "nutrient")}
        >
          {nutrients.map((nutrient) => (
            <option key={nutrient} value={nutrient.toLowerCase()}>
              {nutrient}
            </option>
          ))}
        </select>
        <label htmlFor="effect">Effect</label>
        <select
          id="effect"
          name="effect"
          size="4"
          multiple
          value={plant.effect}
          onChange={(e) => handleMultiChange(e, "effect")}
        >
          {effects.map((effect) => (
            <option key={effect} value={effect.toLowerCase()}>
              {effect}
            </option>
          ))}
        </select>
        <label htmlFor="power">Power</label>
        <select
          id="power"
          name="power"
          size="4"
          multiple
          value={plant.power}
          onChange={(e) => handleMultiChange(e, "power")}
        >
          {powers.map((power) => (
            <option key={power} value={power.toLowerCase()}>
              {power}
            </option>
          ))}
        </select>
        <label htmlFor="grow">Grow</label>
        <input
          type="text"
          id="grow"
          name="grow"
          value={plant.grow}
          onChange={handleChange}
        />
        <label htmlFor="part">Part</label>
        <input
          type="text"
          id="part"
          name="part"
          value={plant.part}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlant;
