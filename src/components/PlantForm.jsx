import { useState, useEffect } from "react";
import { useTitle } from "../context/title.context";
import { MultiSelect } from "chakra-multiselect";

import { useNavigate, useParams } from "react-router-dom";
import plantService from "../services/plant.service";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

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
    <Box>
      <FormControl onSubmit={handleSubmit}>
        <br />
        <FormLabel htmlFor="plantName">Name</FormLabel>
        <Input
          type="text"
          id="plantName"
          name="plantName"
          value={plant.plantName}
          onChange={handleChange}
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
          options={seasons.map((season) => ({ label: season, value: season }))}
          value={plant.season}
          onChange={(e) => handleMultiChange(e, "season")}
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
          options={effects.map((effect) => ({ label: effect, value: effect }))}
          value={plant.effect}
          onChange={(e) => handleMultiChange(e, "effect")}
        />
        <br />

        <FormLabel htmlFor="power">Power</FormLabel>
        <MultiSelect
          id="power"
          name="power"
          size="4"
          options={powers.map((power) => ({ label: power, value: power }))}
          value={plant.power}
          onChange={(e) => handleMultiChange(e, "power")}
        />
        <br />

        <FormLabel htmlFor="grow">Grow</FormLabel>
        <Input
          type="text"
          id="grow"
          name="grow"
          value={plant.grow}
          onChange={handleChange}
        />
        <br />

        <FormLabel htmlFor="part">Part</FormLabel>
        <MultiSelect
          type="text"
          id="part"
          name="part"
          options={parts.map((part) => ({ label: part, value: part }))}
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
      </FormControl>
    </Box>
  );
}

export default NewPlant;
