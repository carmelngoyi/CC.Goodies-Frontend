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
    method: "card", // Default to 'card'
    cardNumber: "",
    expiry: "",
    cvv: "",
    accountNumber: "",
    bankName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

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

  // Function to close the modal and navigate to the Orders page
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/orders"); 
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

      // Clear state and localStorage
      localStorage.setItem("cart", "[]");
      setCartItems([]);
      setShipping({ name: "", address: "", city: "", email: "" });
      setPayment({
        method: "card",
        cardNumber: "",
        expiry: "",
        cvv: "",
        accountNumber: "",
        bankName: "",
      });
      
      // Show the success modal
      setShowSuccessModal(true); 

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
            <button className="back-btn">← Back to Cart</button>
          </Link>
        </div>

        <h2 className="checkout-header">Complete Your Order</h2>
        
        <div className="checkout-main-content">
          
          {/* --- LEFT COLUMN: Order Summary (Cart) --- */}
          <div className="checkout-summary-section">
            <h2>Your Order Summary</h2>
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
                          <button onClick={() => updateQuantity(item._id, -1)} disabled={(item.quantity || 1) <= 1}>-</button>
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
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="checkout-totals">
              <p>Subtotal: R{subtotal.toFixed(2)}</p>
              <p>Tax (15%): R{tax.toFixed(2)}</p>
              <h3>Order Total: R{total.toFixed(2)}</h3>
            </div>
          </div>
          
          {/* --- RIGHT COLUMN: Shipping and Payment Form --- */}
          <div className="checkout-form-section">
            
            {message.text && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
            
            <div className="checkout-form">
              <h2>Shipping Details</h2>
              <form onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={shipping.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={shipping.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address Line"
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
                    🏦 EFT (Electronic Funds Transfer)
                  </button>
                </div>

                {payment.method === "card" && (
                  <div className="card-details">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number *"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      required
                    />
                    <input
                      type="text"
                      name="expiry"
                      placeholder="Expiry (MM/YY) *"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      required
                    />
                    <input
                      type="password"
                      name="cvv"
                      placeholder="CVV *"
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
                      placeholder="Account Number *"
                      value={payment.accountNumber}
                      onChange={handlePaymentChange}
                      required
                    />
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Bank Name *"
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
                  disabled={!allFieldsFilled() || loading}
                >
                  {loading ? "Placing Order..." : `Place Order - R${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
      
      {/* --- SUCCESS MODAL JSX --- */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Order Complete! 🎉</h2>
            <p className="modal-message">Thank you For Shopping With us</p>
            <button 
              className="modal-ok-btn"
              onClick={handleCloseModal}
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;