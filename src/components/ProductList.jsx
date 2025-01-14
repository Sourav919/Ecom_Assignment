import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Products that match search, category, or sort
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Search input
  const [category, setCategory] = useState(""); // Category filter
  const [sortBy, setSortBy] = useState(""); // Sorting option
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const { addToCart } = useContext(CartContext); // Access addToCart function from context
  const navigate = useNavigate(); // For navigation

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Set all products
        setFilteredProducts(data); // Initially show all products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products based on user input
  useEffect(() => {
    let filtered = [...products]; // Work with all products

    // Filter by search term
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Sort by price or rating if selected
    if (sortBy === "price-low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-high-to-low") {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    // Set filtered products after sorting and filtering
    setFilteredProducts(filtered);
  }, [search, category, sortBy, products]); // Reapply filtering and sorting whenever any dependency changes

  // Handle add to cart and show popup message
  const handleAddToCart = (product) => {
    addToCart(product); // Add to cart functionality
    setPopupMessage(`Added "${product.title}" to cart!`); // Set popup message
    setTimeout(() => setPopupMessage(""), 3000); // Remove popup message after 3 seconds
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h2>Product List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-dropdown"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      {/* Sorting Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-dropdown"
      >
        <option value="">Sort By</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="rating-high-to-low">Rating: High to Low</option>
      </select>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div
              className="product-info"
              onClick={() =>
                navigate(`/product`, {
                  state: { product }, // Pass the product object as state
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
            <button onClick={() => handleAddToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="popup-message">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ProductList;
