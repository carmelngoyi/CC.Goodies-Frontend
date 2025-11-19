import React, { useState, useEffect, useContext } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import { apiFetch } from "../../utility/Api.js";
import { ApiContext } from "../../App.jsx";


const elasticIP =  import.meta.env.REACT_APP_API_URL || "http://54.226.0.228:3000";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
  });

  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    accountNumber: "",
    bankName: "",
  });

  const navigate = useNavigate();
  const apiFetch = useContext(ApiContext);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]").map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = parseFloat(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  const tax = parseFloat((subtotal * 0.15).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const handlePaymentChange = e => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty. Please add items before checkout.");
      return;
    }

    if (!shipping.name || !shipping.address || !shipping.email) {
      alert("Please fill all shipping fields");
      return;
    }

    if (payment.method === "card") {
      if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
        alert("Please fill all card details");
        return;
      }
    } else if (payment.method === "eft") {
      if (!payment.accountNumber || !payment.bankName) {
        alert("Please fill EFT details");
        return;
      }
    }

    try {
      await axios.apiFetch("Api/userBankingDetails", {
        email: shipping.email,
        method: payment.method,
        cardNumber: payment.cardNumber,
        expiry: payment.expiry,
        cvv: payment.cvv,
        accountNumber: payment.accountNumber,
        bankName: payment.bankName,
      });


      await axios.post(`${elasticIP}/orders`, {
        email: shipping.email,
        items: cartItems,
        total,
        shipping,
        payment,
        createdAt: new Date(),
      });

      alert("Order placed successfully!");
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      navigate("/products");
    } catch (err) {
      alert("Failed to save banking details.");
    }
  };

  return (
    <>
      <div className="checkout-container">
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/cart">
            <button>Back to Cart</button>
          </Link>
        </div>

        <h2 className="checkout-order">Your Cart</h2>

          <div className="checkout-cart">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="checkout-item">
                    <img
                      src={item.image_url || item.image}
                      alt={item.product_name}
                      className="checkout-img"
                    />
                    <div>
                      <h4>{item.product_name}</h4>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                      </div>
                      <p>
                        Price: R{item.price.toFixed(2)} × {item.quantity} = R
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="remove-item-btn"
                        onClick={() => removeItem(item._id)}
                        style={{
                          marginTop: "8px",
                          background: "#e63946",
                          color: "#fff",
                          border: "none",
                          padding: "4px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Remove Item
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="checkout-totals">
              <p>Subtotal: R{subtotal.toFixed(2)}</p>
              <p>Tax (15%): R{tax.toFixed(2)}</p>
              <h3>Total: R{total.toFixed(2)}</h3>
            </div>
          </div>

        <div className="checkout-content">
          
        <h1>Checkout Information</h1>

          <div className="checkout-form">
            <h2>Shipping Details</h2>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shipping.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shipping.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shipping.email}
                onChange={handleInputChange}
                required
              />

              <h2>Payment Details</h2>
              <div className="payment-methods">
                <button
                  type="button"
                  className={`payment-option ${
                    payment.method === "card" ? "active" : ""
                  }`}
                  onClick={() => setPayment({ ...payment, method: "card" })}
                >
                  <i class="fa fa-credit-card" aria-hidden="true"></i>
 Credit/Debit Card
                </button>
                <button
                  type="button"
                  className={`payment-option ${
                    payment.method === "eft" ? "active" : ""
                  }`}
                  onClick={() => setPayment({ ...payment, method: "eft" })}
                >
                  🏦 EFT
                </button>
              </div>

              {payment.method === "card" && (
                <div className="card-details">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    required
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Expiry (MM/YY)"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    required
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    required
                  />
                </div>
              )}

              {payment.method === "eft" && (
                <div className="eft-details">
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={payment.accountNumber}
                    onChange={handlePaymentChange}
                    required
                  />
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={payment.bankName}
                    onChange={handlePaymentChange}
                    required
                  />
                </div>
              )}

              <button
                className="place-order-btn"
                type="button"
                onClick={handlePlaceOrder}
              >
                Place Your Order
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
