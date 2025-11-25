import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";
import Footer from "../Footer/Footer";  
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

const elasticIP =  import.meta.env.REACT_APP_API_URL || "http://54.226.0.228:3000";

// Removed unused function loadProducts

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");
  // New state for modal control
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  
  const navigate = useNavigate();
  // Note: apiFetch is imported but not used inside the component's main logic flow.
  // The fetch uses the global `fetch` API for products.
  const apiFetch = useContext(ApiContext); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Correcting the API call to use elasticIP
        const response = await fetch(`${elasticIP}/products`);
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
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // Ensure product has a price before adding
    if (product.price) {
        // Add quantity property if missing
        const existingItemIndex = cart.findIndex(item => item._id === product._id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    } else {
        console.error("Product is missing price property.");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAlert(`${product.product_name} added to cart!`);
    setTimeout(() => setAlert(""), 3000);
  };
  
  // New function to handle clicking a product card
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };
  
  // Function to close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };
  
  // Function to add to cart and then close the modal
  const addToCartAndCloseModal = (product) => {
    addToCart(product);
    handleCloseModal();
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="page-wrapper">
        <section className="promo-banner">
          <div className="banner big-sale">
            <h2>Big sale <span>60%</span></h2>
            <p>On selected items</p>
          </div>
          <div className="banner special-coupon">
            <h2>Special Coupon <span>30%</span></h2>
            <p>Use code: SAVE30</p>
          </div>
        </section>
        <div className="divider">
          <h1 className="divider-big">BECOME OUR</h1>
          <h1 className="divider-text text1">BIGGEST!</h1>
          <h1 className="divider-text text2">GREATEST!</h1>
          <h1 className="divider-text text1">SUPER!</h1>
          <h1 className="divider-big">SHOPSTAR</h1>
        
        </div>
        <h1 style={{fontFamily: "Arial, Helvetica, sans-serif",
          marginTop: "50px", 
          color: "darkblue", 
          textAlign: "center"}} 
          className="page-title">Find The Best Goods Right Here!</h1>
      
        {alert && <p className="alert">{alert}</p>}
        <div className="products-container">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="product-card"
              onClick={() => handleProductClick(product)} // Clickable card
            >
              <div>
                <img src={product.image_url || product.image} alt={product.product_name} />
                <h4 className="productbrand">{product.brand}</h4>
                <h3 className="productNames">{product.product_name}</h3>
                <p className="prices">R{product.price}</p>
              </div>
              <button
                className="button quick-view-btn"
                // Stop propagation to prevent card click from firing twice
                onClick={(e) => { e.stopPropagation(); handleProductClick(product); }} 
              >
                View Product
              </button>
            </div>
          ))}
        </div>

        <section className="brands">
          <img src="Nestle-Logo.png" alt="Nestle" />
          <img src="Cadbury-Logo.png" alt="Cadbury" />
          <img src="Nescafe-Logo.jpg" alt="Nescafe" />
          <img src="Nutella-Logo.png" alt="Nutella" />
        </section>

        <section className="organic-banner">
          <h2>Natural & organic</h2>
          <p>Fresh groceries for you and your family</p>
        </section>
        
      </div>
      <Footer />
      
      {/* --- PRODUCT DETAIL MODAL --- */}
      {modalVisible && selectedProduct && (
        // Modal Overlay - click closes the modal
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            
            <div className="modal-content-grid">
              <div className="modal-image-container">
                <img 
                  src={selectedProduct.image_url || selectedProduct.image} 
                  alt={selectedProduct.product_name} 
                />
              </div>
              <div className="modal-details">
                <h4 className="modal-brand">{selectedProduct.brand}</h4>
                <h2 className="modal-name">{selectedProduct.product_name}</h2>
                <p className="modal-description">
                    {selectedProduct.description || "Fresh and high-quality grocery item from the CC.Coodies selection."}
                </p>
                <p className="modal-price">R{selectedProduct.price}</p>
                
                <button
                  className="button modal-add-button"
                  onClick={() => addToCartAndCloseModal(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;