import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Case from "./pages/case";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/a-case-for-desci" element={<Case />} />
    </Routes>
  );
}

export default App;
