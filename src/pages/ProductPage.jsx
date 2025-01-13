import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './ProductPage.css';
import { CartContext } from "../context/CartContext";


const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const { product } = location.state;
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <img src={product.image} alt={product.title} />
      <div><h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
      <p>Category: {product.category}</p>
      
      <span><button
              onClick={() => addToCart(product)} // Add to cart functionality here
            >
              Add to cart
            </button></span>
      </div>
    </div>
  );
};

export default ProductPage;
