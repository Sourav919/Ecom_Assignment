import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Ensure the path is correct
import { Link } from "react-router-dom"; // For cart navigation
import './Header.css'; // Import the CSS file
import logo from './trolley.png'

const Header = () => {
  const { cart } = useContext(CartContext); // Destructure cart from context

  return (
    <header className="header">
      <h1 className="logo">My E-Commerce App</h1>
      <div className="cart-icon"> 
        <Link to="/cart">
          <span  className="cart-count">{cart.length} items</span>
          <img src={logo} alt="Cart" className="cart-img" />

        </Link>
      </div>
    </header>
  );
};

export default Header;
