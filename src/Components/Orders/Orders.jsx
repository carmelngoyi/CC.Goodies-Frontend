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
        
        // FIX: Ensure orders is an array and sort client-side as backup
        let ordersArray = Array.isArray(data) ? data : [];
        
        // Client-side sort as additional safety (newest first)
        ordersArray = ordersArray.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA; // Descending order
        });
        
        setOrders(ordersArray);
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

  // Styled message component
  const Message = ({ children, isError = false }) => (
    <div className={`orders-message-center ${isError ? 'error-state' : ''}`}>
      <h1 className="orders-title">Your Order History</h1>
      <p>{children}</p>
    </div>
  );

  // Conditional rendering
  if (!email) return <Message>Please sign in to view your order history.</Message>;
  if (loading) return <Message>Loading your orders...</Message>;
  if (error) return <Message isError={true}>{error}</Message>;
  if (orders.length === 0) return <Message>No order history found.</Message>;

  return (
    <>
      <div className="orders-container">
        <h1 className="orders-title">Your Order History</h1>

        {orders.map((order, idx) => (
          <div key={order._id || idx} className="order-card">
            
            {/* Header / Metadata Section */}
            <div className="order-metadata">
              <div className="metadata-group">
                <div className="metadata-item">
                  <strong>Order Placed:</strong> 
                  <span>
                    {order.createdAt 
                      ? new Date(order.createdAt).toLocaleDateString('en-ZA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Unknown"}
                  </span>
                </div>
                <div className="metadata-item">
                  <strong>Order Time:</strong> 
                  <span>
                    {order.createdAt 
                      ? new Date(order.createdAt).toLocaleTimeString('en-ZA', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
              
              <div className="metadata-group total-group">
                <div className="metadata-item order-status">
                  <strong>Status:</strong> 
                  <span className={`status-${(order.status || 'delivered').toLowerCase()}`}>
                    {order.status || 'Delivered'}
                  </span>
                </div>
                <div className="metadata-item order-total">
                  <strong>Total:</strong> 
                  <span>R{(order.total || 0).toFixed(2)}</span>
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
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/60";
                        }}
                      />
                      <div>
                        <span className="order-item-name">
                          {item.product_name || "Unknown Product"}
                        </span>
                        <div className="quantity-controls">
                          <span className="qty-badge">Qty: x{item.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                    <span className="order-item-price">
                      R{(item.price || 0).toFixed(2)}
                    </span>
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