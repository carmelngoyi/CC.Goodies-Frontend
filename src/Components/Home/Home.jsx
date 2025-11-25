import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../Footer/Footer";
import { ApiContext } from "../../App.jsx";

const Home = () => {
  const navigate = useNavigate();
  // Using elasticIP to satisfy the original component context, if needed later.
  const { elasticIP } = useContext(ApiContext);

  // Helper function to handle navigation cleanly
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Data for the Swiper Slides
  const slides = [
    {
      className: "slide-1",
      title: "FRESH PICKS. DAILY DELIVERY.",
      text: "Experience the quality of farm-to-table groceries delivered right to your door.",
      path: "/products",
      buttonText: "Start Shopping Now",
    },
    {
      className: "slide-2",
      title: "BUDGET-FRIENDLY, NOT QUALITY-FREE.",
      text: "Big savings on everyday essentials. Stop overpaying for your staples!",
      path: "/deals",
      buttonText: "View Today's Deals",
    },
    {
      className: "slide-3",
      title: "EVERYTHING YOU NEED. ONE CLICK AWAY.",
      text: "From gourmet snacks to pantry basics, find your favorites in our curated selection.",
      path: "/categories",
      buttonText: "Explore Categories",
    },
  ];

  // Data for the Category Grid
  const categories = [
    { path: "/bakery", img: "./dist/bread.jpeg", label: "Bakery" },
    { path: "/beverages", img: "./dist/bevarages.jpeg", label: "Beverages" },
    { path: "/snacks", img: "./dist/snacks.jpg", label: "Snacks" },
    { path: "/poultry", img: "./dist/poultry.jpeg", label: "Meat & Poultry" },
    { path: "/fruitVeg", img: "./dist/fruitVeg.jpg", label: "Fruit & Veg" },
    { path: "/dairy", img: "./dist/dairy.jpg", label: "Dairy" },
  ];

  return (
    <>
      {/* ----------------- ATTENTION-GRABBING SWIPER BANNER ----------------- */}
      <div className="hero-swiper-container">
        <div className="swiper-wrapper">
          {/* Map over the slides array to generate the content */}
          {slides.map((slide, index) => (
            <div key={index} className={`swiper-slide ${slide.className}`}>
              <div className="home-hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <button className="btn" onClick={() => handleNavigation(slide.path)}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Swiper Pagination Dots (Simulated) */}
        <div className="swiper-pagination">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`pagination-dot ${index === 0 ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            ></span>
          ))}
        </div>
      </div>
      {/* -------------------------------------------------------------------- */}

      {/* Main Content Container: Applies max-width and padding from Home.css */}
      <div className="container">
        {/* Featured Categories */}
        <div className="section">
          <h2 className="section-title">Shop by Category</h2>

          <div className="categories-grid">
            {/* Map over the categories array to generate cards */}
            {categories.map((category) => (
              <div
                key={category.path}
                className="category-card"
                onClick={() => handleNavigation(category.path)}
                role="link"
                tabIndex="0"
                aria-label={`Go to ${category.label} products`}
              >
                <img src={category.img} alt={category.label} loading="lazy" />
                <span>{category.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="promo-banner">
          <h2>Big Savings on Everyday Staples</h2>
          <p>Shop now and enjoy premium quality at unbeatable prices.</p>
          <button className="btn-outline" onClick={() => handleNavigation("/products")}>
            Browse Deals
          </button>
        </div>

        {/* Video Section */}
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