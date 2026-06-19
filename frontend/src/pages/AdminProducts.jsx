import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminProducts = () => {
  const [products, setProducts] =
    useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/admin/products/${id}`
      );

      alert(
        "Product Deleted Successfully"
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "40px",
          background: "#f4f7fc",
          minHeight: "100vh",
        }}
      >
        <h1>🛒 Products Management</h1>

        {/* Product Count Card */}
        <div
          style={{
            background: "white",
            width: "250px",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Products</h3>
          <h1>{products.length}</h1>
        </div>

        {/* Products Table */}
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            marginTop: "25px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0b3d0b",
                  color: "white",
                }}
              >
                <th style={{ padding: "12px" }}>
                  Product
                </th>

                <th style={{ padding: "12px" }}>
                  Category
                </th>

                <th style={{ padding: "12px" }}>
                  Price
                </th>

                <th style={{ padding: "12px" }}>
                  Quantity
                </th>

                <th style={{ padding: "12px" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {product.name}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {product.category}
                  </td>

                  <td style={{ padding: "12px" }}>
                    ₹{product.price}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {product.quantity}
                  </td>

                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      style={{
                        background:
                          "#dc3545",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              No Products Found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;