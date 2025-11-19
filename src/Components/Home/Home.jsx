import React, { useEffect, useState } from 'react';
import './Home.css'
import Footer from "../Footer/Footer";  
import { Link } from 'react-router-dom';

const productCategories = [
    { id: 1, name: "Fresh Produce", description: "Farm-to-Table Fruits & Veg", color: "bg-gray-800", icon: "🍎" },
    { id: 2, name: "Dairy & Eggs", description: "All Your Essentials", color: "bg-yellow-400", icon: "🥚" },
    { id: 3, name: "Baking Goods", description: "Flour, Sugar, and More", color: "bg-red-600", icon: "🍞" },
    { id: 4, name: "Snacks & Treats", description: "Indulge Yourself", color: "bg-green-500", icon: "🍪" },
    { id: 5, name: "Household Cleaners", description: "Keep Your Home Spotless", color: "bg-cyan-500", icon: "🧼" },
    { id: 6, name: "Frozen Meals", description: "Quick & Easy Dinners", color: "bg-indigo-600", icon: "🍕" },
];

const featuredProducts = [
    { _id: "granola", product_name: "Assorted Granola 750g", brand: "Granola Organic", price: 43.69, image: "https://placehold.co/300x300/fecaca/dc2626?text=Granola" },
    { _id: "milk", product_name: "Full cream milk 1L", brand: "Clover", price: 20.00, image: "https://placehold.co/300x300/bfdbfe/2563eb?text=Milk" },
    { _id: "oliveoil", product_name: "Extra Virgin Olive Oil", brand: "GreenLeaf", price: 139.69, image: "https://placehold.co/300x300/d1fae5/059669?text=Olive+Oil" },
    { _id: "coconutwater", product_name: "Coconut Water 500ml", brand: "Coco Fresh", price: 35.99, image: "https://placehold.co/300x300/ffe4e6/f43f5e?text=Coco+Water" },
];

const bannerImages = [
    { id: 1, url: 'https://placehold.co/1400x500/1f2937/ffffff?text=WINTER+PRODUCE+SAVINGS', alt: 'Winter Produce Savings', caption: "Up to 30% Off Seasonal Fruits & Veg" },
    { id: 2, url: 'https://placehold.co/1400x500/b91c1c/ffffff?text=WEEKLY+GROCERY+SPECIALS', alt: 'Weekly Grocery Specials', caption: "Massive savings on pantry staples." },
    { id: 3, url: 'https://placehold.co/1400x500/10b981/ffffff?text=DELIVERY+DISCOUNT+EVENT', alt: 'Delivery Discount Event', caption: "Free Delivery on Orders over R500." },
];

// --- 2. HOME COMPONENT ---

const Home = () => {
    const [alert, setAlert] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    // Logic to auto-cycle the banner slides
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => 
                (prevSlide + 1) % bannerImages.length
            );
        }, 4500); // Cycles every 4.5 seconds

        return () => clearInterval(slideInterval);
    }, [bannerImages.length]);

    const addToCart = (product) => {
        // Simple cart simulation using localStorage for persistence
        const auth = localStorage.getItem("Auth");
        if (!auth) {
          setAlert("Please sign in to add items to your cart. (Simulated check)");
          setTimeout(() => setAlert(""), 3000);
          return;
        }
        try {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            setAlert(`${product.product_name} added to cart!`);
        } catch (error) {
            setAlert("Error adding to cart.");
        }
        setTimeout(() => setAlert(""), 3000);
    }

    const currentBanner = bannerImages[currentSlide];

    return (
        <div className="main-content">
            
            {/* Floating Success Alert */}
            {alert && (
                <div className="floating-alert">
                    {alert}
                </div>
            )}

            {/* --- Hero Section & Image Swiper (Banner) --- */}
            <div className="banner-container">
                {bannerImages.map((img, index) => (
                    <div 
                        key={img.id}
                        className="slide"
                        // Setting inline styles for dynamic opacity/z-index based on state
                        style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 10 : 0 }}
                    >
                        <img
                            src={img.url}
                            alt={img.alt}
                            className="slide-image"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1400x500/94a3b8/ffffff?text=Banner+Image+Failed+to+Load" }}
                        />
                        {/* Text Overlay for the Banner */}
                        <div className="slide-overlay">
                            <h1 className="banner-title">
                                {currentBanner.caption.toUpperCase()}
                            </h1>
                            <p className="banner-subtitle">
                                Welcome to <span className="text-accent font-bold">CC.</span>Good<span className="text-accent font-bold">ies</span>. Browse our products and shop affordably.
                            </p>
                            {/* Using <a> tag for navigation placeholder */}
                            <a href="#" className="btn-sale-view">
                                Shop Specials
                            </a>
                        </div>
                    </div>
                ))}
                
                {/* Pagination Dots */}
                <div className="pagination-dots">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* --- Colorful Category Grid --- */}
            <div className="category-section">
                <h2 className="section-heading">Shop by Category</h2>
                <div className="category-grid">
                    {productCategories.map(cat => (
                        // Dynamic class for background color
                        <div key={cat.id} className={`category-card ${cat.color.replace('bg-', 'bg-')}`}>
                            <div className="category-icon">{cat.icon}</div>
                            <div>
                                <h3 className="category-title">{cat.name}</h3>
                                <p className="category-desc">{cat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Featured Products Grid --- */}
            <section className="products-section">
                <h2 className="products-heading">
                    Weekly Specials
                </h2>

                <div className="products-grid">
                    {featuredProducts.map(product => (
                        <div key={product._id} className="product-card">
                            <img 
                                src={product.image} 
                                alt={product.product_name} 
                                className="product-image"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/ccc/000?text=Product+Image" }}
                            />
                            <div className="product-details">
                                <h4 className="product-brand">{product.brand}</h4>
                                <h3 className="product-name">{product.product_name}</h3>
                                <p className="product-price">R{product.price.toFixed(2)}</p>
                            </div>
                            <button
                                className="btn-add-to-cart"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>


            {/* --- Sale Banner (Bottom) --- */}
            <section className="sale-banner">
                <div className="sale-banner-content">
                    <div className="sale-text-group">
                        <h2 className="sale-title">20% OFF</h2>
                        <p className="sale-subtitle">Limited-Time Bulk Deals</p>
                    </div>
                    {/* Using <a> tag for navigation placeholder */}
                    <a href="#" className="btn-sale-view">
                        View All Deals
                    </a>
                </div>
            </section>
            
                  
        </div>
    );
};

export default Home;