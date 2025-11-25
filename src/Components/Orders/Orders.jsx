import React, { useEffect, useState } from "react";
import "./orders.css";
import Footer from "../Footer/Footer.jsx";
import { apiFetch } from "../../utility/Api.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user email safely
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
    const fetchOrders = async () => {
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch(`/api/orders/${email}`);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to fetch your orders. Please try again later.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (!email) return <p>Please sign in to view your orders.</p>;
  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>No order history found.</p>;

  return (
    <>
      <div className="orders-container">
        <h1 className="orders-title">Your Order History</h1>

        {orders.map((order, idx) => (
          <div key={idx} className="order-card">
            <div className="order-header">
              <strong>Order placed on:</strong>{" "}
              {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
            </div>

            <div className="order-total">
              <strong>Total:</strong> R{order.total?.toFixed(2) || 0}
            </div>

            <div className="order-shipping">
              <strong>Shipping to:</strong>{" "}
              {order.shipping?.address || "N/A"}, {order.shipping?.city || "N/A"}
            </div>

            <ul className="order-items">
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, i) => (
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
                    <span className="order-item-price">R{item.price?.toFixed(2) || 0}</span>
                  </li>
                ))
              ) : (
                <li>No items in this order</li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
