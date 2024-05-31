import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import PlantDirectory from "./components/PlantDirectory";
import Gardens from "./pages/Gardens.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <>
      <h1>Dokoro App</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gardens" element={<Gardens />} />

        <Route path="/plants" element={<PlantDirectory />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
