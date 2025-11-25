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
    { path: "/bakery", img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFrZXJ5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D", label: "Bakery" },
    { path: "/dairy", img: "https://www.chanakyadairy.com/wp-content/uploads/2019/04/blog-pic.jpg", label: "Dairy" },
    { path: "/cereal", img: "https://eu-images.contentstack.com/v3/assets/blt2183a7e3152cc969/blt1b9087ea77056d00/64dccd56725fa9888482b479/Keeping_20the_20crunch_20in_20breakfast_20cereals.jpg?width=1280&auto=webp&quality=80&format=jpg&disable=upscale", label: "Cereal" },
    { path: "/fruitVeg", img: "https://fruitezy.com.au/cdn/shop/products/Veggie-fruit-box-square_6113w.jpg?v=1610106932", label: "Fruit & Veg" },
    { path: "/bevarages", img: "https://s7d1.scene7.com/is/image/KeminIndustries/shutterstock_519547867?$responsive$", label: "Beverages" },
    { path: "/snacks", img: "https://nusnax.co.za/wp-content/uploads/2024/05/Home-Page-Bundle.png", label: "Snacks" },
  ];

  return (
    <>
      <div className="hero-swiper-container">
        <div className="swiper-wrapper">
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
            <source src="/dist/assets/Your paragraph text.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;