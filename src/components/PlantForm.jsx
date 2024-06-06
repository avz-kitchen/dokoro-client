import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plantService from "../services/plant.service";

function NewPlant() {
  const [plant, setPlant] = useState({
    plantName: "",
    sciName: "",
    season: [],
    sow: 1,
    nutrient: [],
    effect: [],
    power: [],
    grow: "",
    part: [""],
  });
  const { plantId } = useParams();

  const seasons = ["spring", "summer", "winter", "fall"];
  const nutrients = [
    "Fiber",
    "Protein",
    "Phytonutrients",
    "Carbs",
    "Slow Carb",
    "Dairy",
  ];
  const effects = [
    "high FODMAP (h-F)",
    "relieving bloating and gas(r-g)",
    "soothe gut (s-G)",
    "relieve stomach discomfort  (r-S)",
    "stimulates digestion (s-D)",
    "anti-oxidant (a-o)",
    "anti-inflammatory (a-i)",
    "low FODMAP (l-F)",
    "metabolize estrogen (m-E)",
    "lower cholesterol (l-C)",
    "boost Energy (b-E)",
    "improve cognition (i-C)",
    "regulate estrogen (r-E)",
    "balance melatonin (b-M)",
    "boost immune (b-I)",
  ];

  const powers = [
    "Prebiotic",
    "Probiotic",
    "Iron",
    "Zinc",
    "Magnesium",
    "Potassium",
    "Vitamin A",
    "Vitamin C",
    "Vitamin E",
    "Polyphenols",
    "Omega-3",
    "Beta-carotene",
    "Flovonoids",
  ];
  const parts = [
    "Root",
    "Stem",
    "Leafy",
    "Fruits",
    "Berries",
    "Herbs and Seeds",
  ];

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (plantId) {
      const fetchPlant = async () => {
        try {
          const response = await plantService.getPlant(plantId);
          setPlant(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPlant();
    }
  }, [plantId]);

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
    console.log(plant);
    try {
      if (plantId) {
        await plantService.updatePlant(plantId, plant, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        alert("Plant Updated");
      } else {
        await plantService.createPlant(plant, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        alert("Plant Added");
      }
      navigate("/plants/:plantId");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-plant">
      <h2>Add a new plant</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="plantName">Name</label>
        <input
          type="text"
          id="plantName"
          name="plantName"
          value={plant.plantName}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="sciName">Scientific Name</label>
        <input
          type="text"
          id="sciName"
          name="sciName"
          value={plant.sciName}
          onChange={handleChange}
        />
        <br />

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
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
        <br />

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
            <option key={nutrient} value={nutrient}>
              {nutrient}
            </option>
          ))}
        </select>
        <br />

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
            <option key={effect} value={effect}>
              {effect}
            </option>
          ))}
        </select>
        <br />

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
            <option key={power} value={power}>
              {power}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="grow">Grow</label>
        <input
          type="text"
          id="grow"
          name="grow"
          value={plant.grow}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="part">Part</label>
        <select
          type="text"
          id="part"
          name="part"
          multiple
          value={plant.part}
          onChange={(e) => handleMultiChange(e, "part")}
        >
          {parts.map((part) => (
            <option key={part} value={part}>
              {part}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="sow">Sow</label>
        <input
          type="number"
          min={1}
          max={6}
          id="sow"
          name="sow"
          value={plant.sow}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlant;
