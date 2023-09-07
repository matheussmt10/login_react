import "./Home.css";
import { Login, Register } from "../../components";
import { Routes, Route } from "react-router-dom";
function Home() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Home;
