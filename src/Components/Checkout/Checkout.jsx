import React, { useEffect, useState } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utility/Api.js";
import Footer from "../Footer/Footer.jsx";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
  });
  const [payment, setPayment] = useState({
    method: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    accountNumber: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

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

  const allFieldsFilled = () => {
    const shippingFilled = shipping.name && shipping.address && shipping.email;
    const paymentFilled =
      (payment.method === "card" &&
        payment.cardNumber &&
        payment.expiry &&
        payment.cvv) ||
      (payment.method === "eft" && payment.accountNumber && payment.bankName);
    return shippingFilled && paymentFilled && cartItems.length > 0;
  };

  const handlePlaceOrder = async () => {
    if (!allFieldsFilled()) {
      setMessage({ text: "Please fill all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await apiFetch(`/api/userBankingDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: shipping.email,
          method: payment.method || "card",
          cardNumber: payment.cardNumber,
          expiry: payment.expiry,
          cvv: payment.cvv,
          accountNumber: payment.accountNumber,
          bankName: payment.bankName,
        }),
      });

      const orderPayload = {
        email: shipping.email,
        items: cartItems,
        total,
        shipping,
        payment: { ...payment, method: payment.method || "card" },
        createdAt: new Date(),
      };

      await apiFetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      setMessage({ text: "Order placed successfully!", type: "success" });
      localStorage.setItem("cart", "[]");
      setCartItems([]);
      setShipping({ name: "", address: "", city: "", email: "" });
      setPayment({
        method: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        accountNumber: "",
        bankName: "",
      });

      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to place order. Check console.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="checkout-container">
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/cart">
            <button className="back-btn">Back to Cart</button>
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

          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <div className="checkout-form">
            <h2>Shipping Details</h2>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shipping.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shipping.address}
                onChange={handleInputChange}
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
              />

              <h2>Payment Details</h2>
              <div className="payment-methods">
                <button
                  type="button"
                  className={`payment-option ${payment.method === "card" ? "active" : ""}`}
                  onClick={() => setPayment({ ...payment, method: "card" })}
                >
                  💳 Credit/Debit Card
                </button>
                <button
                  type="button"
                  className={`payment-option ${payment.method === "eft" ? "active" : ""}`}
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
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Expiry (MM/YY)"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
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
                  />
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={payment.bankName}
                    onChange={handlePaymentChange}
                  />
                </div>
              )}

              <button
                className="place-order-btn"
                type="button"
                onClick={handlePlaceOrder}
                disabled={!allFieldsFilled() || loading}
              >
                {loading ? "Placing Order..." : "Place Your Order"}
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
