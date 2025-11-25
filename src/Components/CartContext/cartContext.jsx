// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   const addToCart = (item) => {
//     const existing = cart.find((c) => c._id === item._id);
//     let updatedCart;
//     if (existing) {
//       updatedCart = cart.map((c) =>
//         c._id === item._id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
//       );
//     } else {
//       updatedCart = [...cart, { ...item, quantity: 1 }];
//     }
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (id) => {
//     const updatedCart = cart.filter((item) => item._id !== id);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const updateQuantity = (id, delta) => {
//     const updatedCart = cart.map((item) =>
//       item._id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.setItem("cart", "[]");
//   };

//   return (
//     <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
