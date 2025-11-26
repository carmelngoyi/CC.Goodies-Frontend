import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bakery.css";
import Footer from "../Footer/Footer.jsx";  
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

// Assume this environment variable is correctly set up
const elasticIP =  import.meta.env.REACT_APP_API_URL || "http://54.226.0.228:3000";

// Note: loadProducts function is unused in this component, kept for reference
async function loadProducts() {
  const res = await apiFetch("/Api/bakery");
  const data = await res.json();
  console.log(data);
}

const Bakery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");
  
  // State for the Product Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const apiFetch = useContext(ApiContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${elasticIP}/bakery`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const auth = localStorage.getItem("Auth");
    if (!auth) {
      navigate("/signin");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Checks if the product already exists in the cart
    const existingItemIndex = cart.findIndex(item => item._id === product._id);
    
    if (existingItemIndex !== -1) {
        // If exists, increment quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // If not, add new item with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAlert(`${product.product_name} added to cart!`);
    setTimeout(() => setAlert(""), 3000);
  };
  
  // Modal Handlers
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p className="loading-message">Loading Baked Products...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <>
      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-product-details">
              <img 
                src={selectedProduct.image_url || selectedProduct.image || "https://placehold.co/400x400/3498db/ffffff?text=Bakery+Item"} 
                alt={selectedProduct.product_name} 
                className="modal-image"
              />
              <div className="modal-text-content">
                <h2>{selectedProduct.product_name}</h2>
                <p className="modal-brand">Brand: {selectedProduct.brand || 'N/A'}</p>
                <p className="modal-description">
                  {selectedProduct.description || "A freshly baked product made with high-quality ingredients, perfect for your daily needs."}
                </p>
                <p className="modal-price">R{selectedProduct.price}</p>
                <button
                  className="button modal-add-button"
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeModal(); // Close modal after adding to cart
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bakery-page-wrapper">
        <div className="background2"></div>
        <div className="page-content-container">

          <section className="hero-section1">
            <div className="hero-content">
              <span className="tagline1">Your Comfort is Our Business</span>
              <h1 className="hero-heading1">We Bring the Store to Your Door</h1>
              <p className="subtext">GET 25% OFF ON SELECTED ITEMS</p>
              <button className="shop-btn" onClick={() => navigate("/products")}>Shop All Goods</button>
            </div>
          </section>

          <div className="line-Divider">
              {/* Using a visually appealing divider line for style */}
              <hr className="stylish-hr" />
          </div>

          <h1 className="page-title category-title">Freshly Baked Goods</h1>
        
          {alert && <p className="success-alert">{alert}</p>}
          
          <div className="products-grid-container">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container" onClick={() => openModal(product)}>
                  <img 
                    src={product.image_url || product.image || "https://placehold.co/400x400/f0f0f0/333?text=Bakery"} 
                    alt={product.product_name} 
                  />
                  <div className="quick-view-overlay">
                    <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); openModal(product); }}>
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h4 className="productbrand">{product.brand}</h4>
                  <h3 className="productNames">{product.product_name}</h3>
                  <p className="prices">R{product.price}</p>
                  <button
                    className="button add-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <section className="brands-showcase">
            <img src="https://placehold.co/100x50/3498db/ffffff?text=Nestle" alt="Nestle" />
            <img src="https://placehold.co/100x50/3498db/ffffff?text=Cadbury" alt="Cadbury" />
            <img src="https://placehold.co/100x50/3498db/ffffff?text=Nescafe" alt="Nescafe" />
            <img src="https://placehold.co/100x50/3498db/ffffff?text=Nutella" alt="Nutella" />
          </section>

          <section className="organic-banner">
            <h2>Natural & organic</h2>
            <p>Fresh groceries for you and your family</p>
          </section>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bakery;