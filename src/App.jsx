import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import Home from "./Components/Home/Home.jsx";
import Products from "./Components/Products/Product.jsx"; 
import Bakery from "./Components/Bakery/Bakery.jsx";
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("Auth");
  return isAuth ? children : <Navigate to="/signin" replace />;
};

// Wrapper component to handle conditional Navbar
const AppWrapper = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  const toggleMode = () => setDarkMode((prev) => !prev);

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Update cart and sync with localStorage
  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // --- FIX APPLIED HERE ---
  // Pages where Navbar should be hidden
  const hideNavbarPaths = ["/signin", "/signup"];
  
  // Convert current path to lowercase to handle case-insensitivity (e.g., /Signup vs /signup)
  const currentPath = location.pathname.toLowerCase(); 
  const showNavbar = !hideNavbarPaths.includes(currentPath);
  // -------------------------

  return (
    <>
      {showNavbar && (
        <Navbar darkMode={darkMode} toggleMode={toggleMode} cartItems={cartItems} />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Public pages */}
        <Route path="/homepage" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/bevarages" element={<Bevarages />} />
        <Route path="/cereal" element={<Cereal />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/fruitVeg" element={<FruitVeg />} />
        <Route path="/poultry" element={<Poultry />} />
        <Route path="/snacks" element={<Snacks />} />

        {/* Protected pages */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cartItems={cartItems} updateCart={updateCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiContext.Provider value={apiFetch}>
          <AppWrapper />
        </ApiContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;