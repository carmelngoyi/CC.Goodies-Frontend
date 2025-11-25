import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Footer from "../Footer/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // NOTE: Using localStorage for cart storage is present in the original logic.
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const changeQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    );
    updateCart(updatedCart);
  };

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );

  const handleCheckout = () => {
        navigate("/checkout");
  };

  if (cartItems.length === 0)
    return <p className="empty-cart-message">Your cart is empty.</p>;

  return (
    <>
    <div className="cart-page-wrapper">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        
        {/* Cart Items List */}
        <div className="products-container">
          {cartItems.map((item) => (
            <div key={item._id} className="product-card cart-item">
              
              <div className="item-details-group">
                <img className="item-image" src={item.image_url || item.image} alt={item.product_name} />
                
                <div className="item-info">
                    <h3>{item.product_name}</h3>
                    <p className="item-price-unit">Price: R{item.price}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    className="button quantity-btn"
                    onClick={() => changeQuantity(item._id, -1)}
                    disabled={(item.quantity || 1) <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-count">{item.quantity || 1}</span>
                  <button
                    className="button quantity-btn"
                    onClick={() => changeQuantity(item._id, 1)}
                  >
                    +
                  </button>
                </div>
                
                <p className="item-subtotal">
                  Subtotal: <span>R{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </p>
              </div>
              
              <button
                className="button remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        {/* Cart Summary / Checkout Section */}
        <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>R{getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-line total-line">
                <h2 className="summary-total">Total</h2>
                <h2 className="summary-total-amount">R{getTotal().toFixed(2)}</h2>
            </div>
            <button className="button checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
        </div>
        
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cart;