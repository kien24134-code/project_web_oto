import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import DetailCar from "./pages/DetailCar/DetailCar";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/car/:id" element={<DetailCar />} />
      </Routes>
    </>
  );
}

export default App;
