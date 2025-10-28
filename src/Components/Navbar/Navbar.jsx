import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ darkMode, toggleMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    setIsAuth(!!auth);
    if (auth) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const auth = localStorage.getItem("Auth");
      setIsAuth(!!auth);
      if (auth) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("Auth");
    navigate("/signin");
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <Link to="/" className="logo">
        CC.<span className="logo-h">Good</span>ies
      </Link>

      <div className="nav-links">
        {["/homepage", "/products", "/cart", "/checkout", "/orders"].map(
          (path, index) => {
            let text = "";
            if (path === "/homepage") text = "Home";
            else if (path === "/products") text = "Products";
            else if (path === "/cart") text = `Cart${isAuth ? ` (${cartCount})` : ""}`;
            else if (path === "/checkout") text = "Checkout";
            else if (path === "/orders") text = "My Orders";

            return (
              <Link key={index} to={path} className="nav-link">
                {text}
              </Link>
            );
          }
        )}

        <button onClick={toggleMode} className="toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button><Link to="/signup">Sign in/Sign Up</Link></button>
        {/* {isAuth && (
          <button onClick={handleSignOut} className="toggle-btn" style={{ marginLeft: "1rem", background: "#e63946", color: "#fff" }}>
            Log Out
          </button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;