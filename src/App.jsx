// src/App.jsx
import React, { useState, createContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import Home from "./Components/Home/Home.jsx";
import Products from "./Components/Products/Product.jsx"; 
import Backery from "./Components/Backery/Backery.jsx";
import Bevarages from "./Components/Bevarages/Bevarages.jsx";
import Cereal from "./Components/Cereal/Cereal.jsx";
import Dairy from "./Components/Dairy/Dairy.jsx";
import FruitVeg from "./Components/FruitVeg/FruitVeg.jsx";
import Poultry from "./Components/Poultry/Poultry.jsx";
import Snacks from "./Components/Snacks/Snacks.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import { AuthProvider } from "./Components/AuthContext.jsx";
import { apiFetch } from "./utility/Api.js"; 

export const ApiContext = createContext(apiFetch); 

const baseURL = import.meta.env.VITE_API_URL;


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((prev) => !prev);

  // Set forced IP once
  // useEffect(() => {
  //   const forcedIp = "54.145.35.219"; 
  //   const url = new URL(window.location);
  //   if (!url.searchParams.get("ip")) {
  //     url.searchParams.set("ip", forcedIp);
  //     window.history.pushState({}, "", url.toString());
  //     localStorage.setItem("forcedIp", forcedIp);
  //   }
  // }, []);

  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiContext.Provider value={apiFetch}> 
          <Navbar darkMode={darkMode} toggleMode={toggleMode} />
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/backery" element={<Backery />} />
            <Route path="/bevarages" element={<Bevarages />} />
            <Route path="/cereal" element={<Cereal />} />
            <Route path="/dairy" element={<Dairy />} />
            <Route path="/fruitVeg" element={<FruitVeg />} />
            <Route path="/poultry" element={<Poultry />} />
            <Route path="/snacks" element={<Snacks />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </ApiContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;