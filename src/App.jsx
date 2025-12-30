import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Cart from "./pages/Cart/Cart";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import DetailCar from "./pages/DetailCar/DetailCar";

import Search from "./components/Search/Search";

function App() {
  const [cartVersion, setCartVersion] = useState(0);
  const bumpCart = () => setCartVersion((v) => v + 1);

  // dữ liệu cho Search + Home dùng chung
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data/cars.json")
      .then((r) => r.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <Routes>
      <Route
        element={
          <Layout
            cartVersion={cartVersion}
            headerCenter={
              <Search cars={cars} query={query} setQuery={setQuery} />
            }
          />
        }
      >
        <Route path="/" element={<Home cars={cars} query={query} />} />
      </Route>

      <Route element={<Layout cartVersion={cartVersion} headerCenter={null} />}>
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/car/:id" element={<DetailCar bumpCart={bumpCart} />} />
        <Route path="/cart" element={<Cart bumpCart={bumpCart} />} />
      </Route>

      <Route path="/login" element={<Login bumpCart={bumpCart} />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
