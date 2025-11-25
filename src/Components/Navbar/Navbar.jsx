import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaCog } from "react-icons/fa";

const Navbar = ({ darkMode, toggleMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);
  const toggleSettings = () => setOpenSettings(!openSettings);

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

  const categories = [
    { path: "/bakery", text: "Bakery" },
    { path: "/bevarages", text: "Beverages" },
    { path: "/cereal", text: "Cereal" },
    { path: "/dairy", text: "Dairy" },
    { path: "/fruitVeg", text: "Fruit & Veg" },
    { path: "/poultry", text: "Poultry" },
    { path: "/snacks", text: "Snacks" },
  ];

  const mainNavLinks = [
    { path: "/homepage", text: "Home" },
    { path: "/products", text: "Products" },
  ];

  const trailingNavLinks = [
    { path: "/cart", text: `Cart${isAuth ? ` (${cartCount})` : ""}` },
    { path: "/checkout", text: "Checkout" },
    { path: "/orders", text: "My Orders" },
  ];

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <Link to="/" className="logo">
        CC.<span className="logo-h">Good</span>ies
      </Link>

      <div className="nav-links">
        
        {mainNavLinks.map((link, index) => (
          <Link key={index} to={link.path} className="nav-link">
            {link.text}
          </Link>
        ))}

        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="nav-link dropdown-toggle">
            Categories <i className="fa fa-caret-down" aria-hidden="true"></i>
          </span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {trailingNavLinks.map((link, index) => (
          <Link key={`trailing-${index}`} to={link.path} className="nav-link">
            {link.text}
          </Link>
        ))}

        {/* SETTINGS MENU */}
        <div className="settings-container">
          <FaCog className="settings-icon" onClick={toggleSettings} />

          {openSettings && (
            <div className="settings-dropdown">

              <button onClick={toggleMode} className="settings-item">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              {isAuth && (
                <button onClick={handleSignOut} className="settings-item logout-btn">
                  Sign out/ Sign In
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
