import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ darkMode, toggleMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // --- Initial Setup and Auth/Cart Logic (Unchanged) ---
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

  // const handleSignOut = () => {
  //   localStorage.removeItem("Auth");
  //   navigate("/signin");
  // };
  // --- End of Initial Setup and Auth/Cart Logic ---

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const categories = [
    { path: "/backery", text: "Backery" },
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
        
        {/* --- Home and Products Links --- */}
        {mainNavLinks.map((link, index) => (
          <Link key={index} to={link.path} className="nav-link">
            {link.text}
          </Link>
        ))}

        {/* --- Categories Dropdown (Position 3) --- */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="nav-link dropdown-toggle">
            Categories <i class="fa fa-caret-down" aria-hidden="true"></i>

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

        {/* <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input ${darkMode ? "dark" : "light"}`}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form> */}

        <button onClick={toggleMode} className="mode-icon-btn">
          {darkMode ? '☀️' : '🌙'}
        </button>
        
        {/* Sign Out Logic (Commented out as in original) */}
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