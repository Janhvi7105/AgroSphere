import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>🛒 Marketplace</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Product"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <option value="All">All Categories</option>
        <option value="Vegetables">
          Vegetables
        </option>
        <option value="Fruits">
          Fruits
        </option>
        <option value="Grains">
          Grains
        </option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>

            <p>
              <b>Category:</b>{" "}
              {product.category}
            </p>

            <p>
              <b>Price:</b> ₹{product.price}
            </p>

            <p>
              <b>Quantity:</b>{" "}
              {product.quantity}
            </p>

            <p>{product.description}</p>

            <button
              onClick={() =>
                navigate(
                  `/product/${product._id}`
                )
              }
              style={{
                marginTop: "10px",
                padding: "10px 15px",
                background: "#0b3d0b",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;