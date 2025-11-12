import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";
import Footer from "../Footer/Footer";  
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

async function loadProducts() {
  const res = await apiFetch("/Api/products");
  const data = await res.json();
  console.log(data);
}

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const apiFetch = useContext(ApiContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3.89.113.111:3000/products`);
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
      <p>Fresh groceries for your family</p>
    </section>
    
  </div>
  <Footer />
  </>
);

};

export default Product;