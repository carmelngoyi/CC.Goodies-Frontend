import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Footer from "../Footer/Footer";

const Cart = ({ cartItems, updateCart }) => {
  const navigate = useNavigate();

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
    cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0)
    return <p className="empty-cart">Your cart is empty.</p>;

  return (
    <>
      <div className="cart-wrapper">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img
                  src={item.image_url || item.image}
                  alt={item.product_name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <h3>{item.product_name}</h3>
                  <p className="cart-price">R{item.price}</p>

                  <div className="qty-controller">
                    <button
                      onClick={() => changeQuantity(item._id, -1)}
                      disabled={(item.quantity || 1) <= 1}
                      className="changeQty"
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() => changeQuantity(item._id, 1)}
                      className="changeQty"
                    >
                      +
                    </button>
                  </div>

                  <p className="subtotal">
                    Subtotal: R{(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>

                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item._id)}
                >
                  <i className="fa fa-trash bin" aria-hidden="true"></i>
                </button>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>R{getTotal().toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>R{getTotal().toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout}>Go to Checkout →</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
