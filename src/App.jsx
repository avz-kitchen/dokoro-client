import { Routes, Route } from "/react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "/src/pages/Login";
import Signup from "./pages/Signup";
import Gardens from "./pages/Gardens.jsx";
import PlantGarden from "./pages/PlantGarden.jsx";
import PlantDirectory from "./components/PlantDirectory";
import NewPlant from "./pages/NewPlant.jsx";
import AppBody from "./Layout/appBody.jsx";
function App() {
  return (
    <>
      <h1>Dokoro App</h1>
      <Routes>
        <Route path="/" element={<AppBody />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="gardens" element={<Gardens />} />
          <Route path="plant-garden" element={<PlantGarden />} />
          <Route path="plants" element={<PlantDirectory />} />
          <Route path="plant-new" element={<NewPlant />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
