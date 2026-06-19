import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 My Products</h1>

      {products.length === 0 ? (
        <h3>No Products Added Yet</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{product.name}</h2>

              <p>
                <b>Category:</b> {product.category}
              </p>

              <p>
                <b>Price:</b> ₹{product.price}
              </p>

              <p>
                <b>Quantity:</b> {product.quantity}
              </p>

              <p>{product.description}</p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() =>
                    navigate(`/edit-product/${product._id}`)
                  }
                  style={{
                    background: "#0b3d0b",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;