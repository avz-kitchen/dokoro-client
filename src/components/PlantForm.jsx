import { useState, useEffect } from "react";
import { useTitle } from "../context/title.context";
import { MultiSelect } from "chakra-multiselect";

import { useNavigate, useParams } from "react-router-dom";
import plantService from "../services/plant.service";
import { Box, FormLabel, Input, Button } from "@chakra-ui/react";

function NewPlant() {
  const { setTitle } = useTitle();

  const [plant, setPlant] = useState({
    plantName: "",
    sciName: "",
    season: [],
    sow: 1,
    nutrient: [],
    effect: [],
    power: [],
    method: "",
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
    setTitle("New Plant");
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

  const handleMultiChange = (selectedOptions, name) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    setPlant({ ...plant, [name]: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(plant);
    const updatedPlant = {
      ...plant,
      season: plant.season.map((season) => season.value),
      nutrient: plant.nutrient.map((nutrient) => nutrient.value),
      effect: plant.effect.map((effect) => effect.value),
      power: plant.power.map((power) => power.value),
      part: plant.part.map((part) => part.value),
    };
    try {
      if (plantId) {
        await plantService.updatePlant(plantId, updatedPlant, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        alert("Plant Updated");
      } else {
        await plantService.createPlant(updatedPlant, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        alert("Plant Added");
      }
      navigate("/plants");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <br />
        <FormLabel htmlFor="plantName">Name</FormLabel>
        <Input
          type="text"
          id="plantName"
          name="plantName"
          value={plant.plantName}
          onChange={handleChange}
          required
        />
        <br />

        <FormLabel htmlFor="sciName">Scientific Name</FormLabel>
        <Input
          type="text"
          id="sciName"
          name="sciName"
          value={plant.sciName}
          onChange={handleChange}
        />
        <br />

        <FormLabel htmlFor="season">Season</FormLabel>
        <MultiSelect
          id="season"
          name="season"
          size="4"
          options={seasons.map((season) => ({ value: season, label: season }))}
          value={plant.season}
          onChange={(e) => handleMultiChange(e, "season")}
          required
        />

        <br />

        <FormLabel htmlFor="nutrient">Nutrient</FormLabel>
        <MultiSelect
          id="nutrient"
          name="nutrient"
          size="4"
          options={nutrients.map((nutrient) => ({
            label: nutrient,
            value: nutrient,
          }))}
          value={plant.nutrient}
          onChange={(e) => handleMultiChange(e, "nutrient")}
        />
        <br />

        <FormLabel htmlFor="effect">Effect</FormLabel>
        <MultiSelect
          id="effect"
          name="effect"
          size="4"
          options={effects.map((effect) => ({ value: effect, label: effect }))}
          value={plant.effect}
          onChange={(e) => handleMultiChange(e, "effect")}
          required
        />
        <br />

        <FormLabel htmlFor="power">Power</FormLabel>
        <MultiSelect
          id="power"
          name="power"
          size="4"
          options={powers.map((power) => ({ value: power, label: power }))}
          value={plant.power}
          onChange={(e) => handleMultiChange(e, "power")}
        />
        <br />

        <FormLabel htmlFor="method">Method</FormLabel>
        <Input
          type="text"
          id="method"
          name="method"
          value={plant.method}
          onChange={handleChange}
        />
        <br />

        <FormLabel htmlFor="part">Part</FormLabel>
        <MultiSelect
          type="text"
          id="part"
          name="part"
          options={parts.map((part) => ({ value: part, label: part }))}
          value={plant.part}
          onChange={(e) => handleMultiChange(e, "part")}
        />
        <br />

        <FormLabel htmlFor="sow">Sow</FormLabel>
        <Input
          type="number"
          min={1}
          max={6}
          id="sow"
          name="sow"
          value={plant.sow}
          onChange={handleChange}
        />
        <br />

        <Button type="submit">Add Plant</Button>
      </form>
    </Box>
  );
}

export default NewPlant;
