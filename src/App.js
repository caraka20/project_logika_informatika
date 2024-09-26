import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLogika from "./Pages/MainLogika";

function App() {
  return (
    <Routes>
      <Route path="/logika" element={<MainLogika />} />
    </Routes>
  );
}

export default App;
