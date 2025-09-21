import React, { useState } from "react";
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((prev) => !prev);

  
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
