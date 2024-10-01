import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLogika from "./Pages/MainLogika";
import MainKalkulus from "./Pages/MainKalkulus";
import HomePage from "./Pages/HomePage";
import Nav from "./Components/Nav";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-gray-900">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logika-informatika" element={<MainLogika />} />
        <Route path="/kalkulus" element={<MainKalkulus />} />
      </Routes>
    </div>
  );
}

export default App;
