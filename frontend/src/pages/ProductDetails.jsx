import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        );

        const selectedProduct =
          data.find(
            (item) => item._id === id
          );

        setProduct(selectedProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Product...
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>📦 Product Details</h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2>{product.name}</h2>

        <p>
          <b>Category:</b>{" "}
          {product.category}
        </p>

        <p>
          <b>Price:</b> ₹
          {product.price}
        </p>

        <p>
          <b>Quantity:</b>{" "}
          {product.quantity}
        </p>

        <p>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;