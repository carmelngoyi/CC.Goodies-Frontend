import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../Footer/Footer";  
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { elasticIP } = useContext(ApiContext);

  return (
    <>
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>Fresh. Affordable. Everyday Essentials.</h1>
          <p>Your one-stop shop for quality groceries at budget-friendly prices.</p>
          <button className="btn" onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      </div>

      <div className="container">
        {/* Featured Categories */}
        <div className="section">
          <h2 className="section-title">Shop by Category</h2>

          <div className="categories-grid">
            <div className="category-card" onClick={() => navigate("/bakery")}>
              <img src="./dist/bread.jpeg" />
              <span>Bakery</span>
            </div>

            <div className="category-card" onClick={() => navigate("/beverages")}>
              <img src="./dist/bevarages.jpeg" />
              <span>Beverages</span>
            </div>

            <div className="category-card" onClick={() => navigate("/snacks")}>
              <img src="./dist/snacks.jpg" />
              <span>Snacks</span>
            </div>

            <div className="category-card" onClick={() => navigate("/poultry")}>
              <img src="./dist/poultry.jpeg" />
              <span>Meat & Poultry</span>
            </div>

            <div className="category-card" onClick={() => navigate("/fruitVeg")}>
              <img src="./dist/fruitVeg.jpg" />
              <span>Fruit & Veg </span>
            </div>

            <div className="category-card" onClick={() => navigate("/dairy")}>
              <img src="./dist/dairy.jpg" />
              <span>Dairy</span>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="promo-banner">
          <h2>Big Savings on Everyday Staples</h2>
          <p>Shop now and enjoy premium quality at unbeatable prices.</p>
          <button className="btn-outline" onClick={() => navigate("/products")}>
            Browse Deals
          </button>
        </div>

        <div className="video">
          <video
            width="100%"
            controls
            autoPlay
            loop
            muted
            style={{ borderRadius: "10px" }}
          >
            <source src="/dist/Your paragraph text.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
                  </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
