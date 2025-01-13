import React, { useState } from "react";

const FilterBar = ({ products, setFilteredProducts }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
