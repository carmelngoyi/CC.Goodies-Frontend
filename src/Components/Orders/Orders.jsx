import React, { useEffect, useState } from "react";
import "./orders.css";
import Footer from "../Footer/Footer.jsx";
import { apiFetch } from "../../utility/Api.js"; // Kept import for reference

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
        // NOTE: Keeping the original apiFetch logic intact
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

  // --- Conditional Rendering for States ---

  // Replaced simple text with styled centered messages for better appearance
  const Message = ({ children, isError = false }) => (
    <div className={`orders-message-center ${isError ? 'error-state' : ''}`}>
      <h1 className="orders-title">Your Order History</h1>
      <p>{children}</p>
    </div>
  );

  if (!email) return <Message>Please **sign in** to view your order history.</Message>;
  if (loading) return <Message>Loading your orders...</Message>;
  if (error) return <Message isError={true}>{error}</Message>;
  if (orders.length === 0) return <Message>No order history found.</Message>;


  // --- Main Render ---

  return (
    <>
      <div className="orders-container">
        <h1 className="orders-title">Your Order History</h1>

        {orders.map((order, idx) => (
          <div key={idx} className="order-card">
            
            {/* Header / Metadata Section */}
            <div className="order-metadata">
                {/* Order ID/Date */}
                <div className="metadata-group">
                    <div className="metadata-item">
                        <strong>Order Placed:</strong> 
                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown"}</span>
                    </div>
                    <div className="metadata-item">
                        <strong>Order Time:</strong> 
                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : "N/A"}</span>
                    </div>
                </div>
                
                {/* Status/Total */}
                <div className="metadata-group total-group">
                    <div className="metadata-item order-status">
                        <strong>Status:</strong> 
                        <span className={`status-${order.status?.toLowerCase() || 'delivered'}`}>
                            {order.status || 'Delivered'}
                        </span>
                    </div>
                    <div className="metadata-item order-total">
                        <strong>Total:</strong> 
                        <span>R{order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                </div>
            </div>

            {/* Order Items List */}
            <ul className="order-items">
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, i) => (
                  <li key={i} className="order-item">
                    <div className="order-item-info">
                      <img
                        src={item.image_url || item.image || "https://via.placeholder.com/60"}
                        alt={item.product_name || "Product"}
                      />
                      <div>
                        <span className="order-item-name">{item.product_name || "Unknown"}</span>
                        <div className="quantity-controls">
                          <span className="qty-badge">Qty: x {item.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                    <span className="order-item-price">R{item.price?.toFixed(2) || '0.00'}</span>
                  </li>
                ))
              ) : (
                <li className="no-items-placeholder">No items found for this order.</li>
              )}
            </ul>
            
            {/* Footer / Shipping Information */}
            <div className="order-footer">
                <strong>Shipping Address:</strong>{" "}
                {order.shipping?.address || "N/A"} / {order.shipping?.city || "N/A"}
            </div>
            
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Orders;