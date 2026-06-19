import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>➕ Add Product</h1>

      <form onSubmit={addProduct}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;