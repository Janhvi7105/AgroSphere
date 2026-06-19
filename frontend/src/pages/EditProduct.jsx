import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    price: "",
    quantity: "",
    description: "",
  });

  const fetchProduct = useCallback(async () => {
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

      const selectedProduct = data.find(
        (p) => p._id === id
      );

      if (selectedProduct) {
        setProduct({
          price: selectedProduct.price,
          quantity: selectedProduct.quantity,
          description: selectedProduct.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      navigate("/my-products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>✏ Edit Product</h1>

      <form onSubmit={updateProduct}>
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) =>
            setProduct({
              ...product,
              quantity: e.target.value,
            })
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <br /><br />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;