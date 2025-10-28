// src/App.jsx
import React, { useState, createContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import Home from "./Components/Home/Home.jsx";
import Products from "./Components/Products/Product.jsx"; 
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

<<<<<<< HEAD
  // Set forced IP once
  useEffect(() => {
    const forcedIp = "54.145.35.219"; 
    const url = new URL(window.location);
    if (!url.searchParams.get("ip")) {
      url.searchParams.set("ip", forcedIp);
      window.history.pushState({}, "", url.toString());
      localStorage.setItem("forcedIp", forcedIp);
    }
  }, []);

=======

  
>>>>>>> f12b923 (env ready for deployment)
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
