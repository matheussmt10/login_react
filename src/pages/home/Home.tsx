import "./Home.css";
import { Login, Register } from "../../components";
import { Routes, Route } from "react-router-dom";
function Home() {
  return (
    <>
      <p>teste</p>
      <Routes>
        <Login />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default Home;
