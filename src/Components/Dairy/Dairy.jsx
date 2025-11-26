import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dairy.css";
import Footer from "../Footer/Footer";  
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

const elasticIP =  import.meta.env.REACT_APP_API_URL || "http://54.226.0.228:3000";

async function loadProducts() {
  const res = await apiFetch("/Api/dairy");
  const data = await res.json();
  console.log(data);
}

const Dairy = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const apiFetch = useContext(ApiContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${elasticIP}/dairy`);
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
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setAlert(`${product.product_name} added to cart!`);
    setTimeout(() => setAlert(""), 3000);
  };

  if (loading) return <p>Loading Dairy products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
  <div className="page-wrapper4">
    {/* <section className="promo-banner">
      <div className="banner big-sale">
        <h2>Big sale <span>60%</span></h2>
        <p>On selected items</p>
      </div>
      <div className="banner special-coupon">
        <h2>Special Coupon <span>30%</span></h2>
        <p>Use code: SAVE30</p>
      </div>
    </section> */}
    <div className="vegVideo1">
      <h3 className="dairy">Farm Fresh Dairy</h3>
          <video
            width="60%"
            controls
            autoPlay
            loop
            muted
            style={{ borderRadius: "10px" }}
          >
            <source src="https://media.istockphoto.com/id/92577373/video/dairy-products.mp4?s=mp4-640x640-is&k=20&c=4FAj2xlftI3tReBUThCvkqrCyaX1hwlpV-10oFwFaH0=" type="video/mp4" />
          </video>
        
    </div>
    <h1 style={{fontFamily: "Arial, Helvetica, sans-serif",
      marginTop: "50px", 
      color: "darkblue", 
      textAlign: "center"}} 
      className="page-title">Farm-Fresh Dairy Goods for Your Kitchen!</h1>
   
    {alert && <p className="alert">{alert}</p>}
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <div>
            <img src={product.image_url || product.image} alt={product.product_name} />
            <h4 className="productbrand">{product.brand}</h4>
            <h3 className="productNames">{product.product_name}</h3>
            <p className="prices">R{product.price}</p>
          </div>
          <button
            className="button add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
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
  </>
);

};

export default Dairy;