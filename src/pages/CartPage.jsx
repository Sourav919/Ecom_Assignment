import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import './CartPage.css';

const CartPage = () => {
  const { cart, updateCart } = useContext(CartContext);

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h2>{item.title}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => updateCart(item.id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => updateCart(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
        </div>
      ))}
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default CartPage;
