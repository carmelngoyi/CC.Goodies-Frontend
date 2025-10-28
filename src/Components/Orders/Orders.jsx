import React, { useEffect, useState, useContext } from "react";
import { ApiContext } from "../../App.jsx";
// import axios from "axios";
import "./orders.css";
import Footer from "../Footer/Footer.jsx";

<<<<<<< HEAD
const Orders = () => {
  const apiFetch = useContext(ApiContext);
=======
// Optional: simple error boundary component for safer rendering
class OrdersErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error in Orders component:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong while loading orders.</p>;
    }
    return this.props.children;
  }
}

const OrdersContent = () => {
>>>>>>> f12b923 (env ready for deployment)
  const [orders, setOrders] = useState([]);

  // Safe localStorage parsing
  const email = (() => {
    const stored = localStorage.getItem("Auth");
    if (!stored || stored === "undefined") return null;
    try {
      return JSON.parse(stored)?.email || null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
<<<<<<< HEAD
    if (email) {
      apiFetch(`Api/orders/${email}`)
        .then(res => setOrders(res.data))
        .catch(() => setOrders([]));
    }
=======
    if (!email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/orders/${email}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
>>>>>>> f12b923 (env ready for deployment)
  }, [email]);

  if (!email) return <p>Please sign in to view your orders.</p>;
  if (orders.length === 0) return <p>No order history found.</p>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Order History</h1>
      {orders.map((order, idx) => (
        <div key={idx} className="order-card">
          <div className="order-header">
            <strong>Order placed on:</strong>{" "}
            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
          </div>
          <div className="order-total">
            <strong>Total:</strong> R{order.total || 0}
          </div>
          <div className="order-shipping">
            <strong>Shipping to:</strong>{" "}
            {order.shipping?.address || "N/A"}, {order.shipping?.city || "N/A"}
          </div>
          <ul className="order-items">
            {order.items?.map((item, i) => (
              <li key={i} className="order-item">
                <div className="order-item-info">
                  <img
                    src={item.image_url || item.image || ""}
                    alt={item.product_name || "Product"}
                  />
                  <div>
                    <span className="order-item-name">{item.product_name || "Unknown"}</span>
                    <div className="quantity-controls">
                      <span>x {item.quantity || 1}</span>
                    </div>
                  </div>
                </div>
                <span className="order-item-price">R{item.price || 0}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Orders = () => (
  <OrdersErrorBoundary>
    <OrdersContent />
    <Footer />
  </OrdersErrorBoundary>
);

export default Orders;
