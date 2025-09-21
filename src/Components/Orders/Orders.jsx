import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import Footer from "../Footer/Footer.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const email = JSON.parse(localStorage.getItem("Auth"))?.email;

  useEffect(() => {
    if (email) {
      axios.get(`http://serverIP:3000/api/orders/${email}`)
        .then(res => setOrders(res.data))
        .catch(() => setOrders([]));
    }
  }, [email]);

  if (!email) return <p>Please sign in to view your orders.</p>;
  if (orders.length === 0) return <p>No order history found.</p>;

  return (
    <>
    <div className="orders-container">
      <h1 className="orders-title">Your Order History</h1>
      {orders.map((order, idx) => (
        <div key={idx} className="order-card">
          <div className="order-header">
            <strong>Order placed on:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="order-total">
            <strong>Total:</strong> R{order.total}
          </div>
          <div className="order-shipping">
            <strong>Shipping to:</strong> {order.shipping.address}, {order.shipping.city}
          </div>
          <ul className="order-items">
            {order.items.map((item, i) => (
              <li key={i} className="order-item">
                <div className="order-item-info">
                  <img
                    src={item.image_url || item.image}
                    alt={item.product_name}
                  />
                  <div>
                    <span className="order-item-name">{item.product_name}</span>
                    <div className="quantity-controls">
                      <span>x {item.quantity}</span>
                    </div>
                  </div>
                </div>
                <span className="order-item-price">R{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
};

export default Orders;
