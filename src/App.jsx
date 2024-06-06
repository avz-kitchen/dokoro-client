import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "/src/pages/Login";
import Signup from "./pages/Signup.jsx";
import Gardens from "./pages/Gardens.jsx";
import PlantGarden from "./pages/PlantGarden.jsx";
import PlantDirectory from "./pages/PlantDirectory";
import Plant from "./pages/Plant.jsx";
import NewPlant from "./components/PlantForm.jsx";
import AppLayout from "./Layout/appLayout.jsx";
import { TitleProvider } from "./context/title.context.jsx";
function App() {
  return (
    <TitleProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="gardens" element={<Gardens />} />
          <Route path="gardens/:gardenId" element={<PlantGarden />} />
          <Route path="garden-new" element={<PlantGarden />} />
          <Route path="plants" element={<PlantDirectory />} />
          <Route path="plants/:plantId" element={<Plant />} />
          <Route path="plant-new" element={<NewPlant />} />
        </Route>
      </Routes>
    </TitleProvider>
  );
}

export default App;
