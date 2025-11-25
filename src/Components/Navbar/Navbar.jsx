import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ darkMode, toggleMode, cartItems }) => { 
  const navigate = useNavigate();

  const categories = [
    { name: "Bakery", path: "/bakery" },
    { name: "Beverages", path: "/beverages" },
    { name: "Cereal", path: "/cereal" },
    { name: "Dairy", path: "/dairy" },
    { name: "Fruit & Veg", path: "/fruitVeg" },
    { name: "Meat & Poultry", path: "/poultry" },
    { name: "Snacks", path: "/snacks" },
  ];
  
  const isAuth = localStorage.getItem("Auth");
  const isLoggedIn = !!isAuth; 

  
  const handleSignOut = () => {
    localStorage.removeItem("Auth"); 
    navigate("/signin");
  };
  
  const cartItemCount = Array.isArray(cartItems) ? cartItems.length : 0;

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <nav className="navbar">
        <div className="navbar-container container">
          <div className="logo" onClick={() => navigate("/")}>
            <h1 className='navLogo'>CC.Goodies</h1>
          </div>
          
          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/products")}>Products</li>
            
            <li className="dropdown">
              <span className="dropdown-title">Categories ▼</span>
              <div className="dropdown-menu">
                {categories.map((cat) => (
                  <span key={cat.name} onClick={() => navigate(cat.path)}>
                    {cat.name}
                  </span>
                ))}
              </div>
            </li>
            
            <li onClick={() => navigate("/checkout")}>Checkout</li>
            <li onClick={() => navigate("/orders")}>My Orders</li>
          </ul>
          
          <div className="nav-actions">
            
            <div className="nav-icon-wrapper" onClick={() => navigate("/cart")}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>
              

            <div className="nav-icon dropdown">
                <i className="fa fa-cog" aria-hidden="true"></i>

                <div className="dropdown-menu dropdown-settings">
                    <span onClick={toggleMode}>
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </span>
                    
                    {isLoggedIn ? (
                        <span onClick={handleSignOut}>
                             Sign Out
                        </span>
                    ) : (
                        <span onClick={() => navigate("/signin")}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                             Sign In
                        </span>
                    )}
                </div>
            </div>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;