import React, { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Find the product in the cart
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
  
      if (productIndex >= 0) {
        // If the product is already in the cart, increase the quantity
        const updatedCart = prevCart.map((item, index) => 
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCart;
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to update the quantity of a product in the cart
  const updateCart = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // If the quantity is 0 or less, remove the item from the cart
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      // Update the quantity of the product if it's greater than 0
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        return updatedCart;
      });
    }
  };

  // Function to calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
