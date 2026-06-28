import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders"
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "30px",
          background: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <h1>📦 All Orders</h1>

        <br />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#0b5d1e",
                color: "white",
              }}
            >
              <th style={{ padding: 15 }}>Product</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ padding: 15 }}>
                  {order.productName}
                </td>

                <td>{order.buyer}</td>

                <td>{order.seller}</td>

                <td>{order.quantity} kg</td>

                <td>₹{order.totalAmount}</td>

                <td>{order.paymentStatus}</td>

                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrders;