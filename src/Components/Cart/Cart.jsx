import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Footer from "../Footer/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    // alert("Checkout successful! Your cart will be cleared.");
    // setCartItems([]);
    // localStorage.setItem("cart", JSON.stringify([]));
        navigate("/checkout");

  };

  if (cartItems.length === 0)
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;

  return (
    <>
    <div>
      <h1 style={{ padding: "20px" }}>Shopping Cart</h1>
      <div className="products-container">
        {cartItems.map((item) => (
          <div key={item._id} className="product-card">
            <div>
              <img src={item.image_url || item.image} alt={item.product_name} />
              <h3>{item.product_name}</h3>
              <p>R{item.price}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  className="button"
                  onClick={() => changeQuantity(item._id, -1)}
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  className="button"
                  onClick={() => changeQuantity(item._id, 1)}
                >
                  +
                </button>
              </div>
              <p>
                Subtotal: R{(item.price * (item.quantity || 1)).toFixed(2)}
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
      <div style={{ padding: "20px", textAlign: "right" }}>
        <h2>Total: R{getTotal().toFixed(2)}</h2>
        <button className="button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cart;