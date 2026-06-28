import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import FarmerNavbar from "../components/FarmerNavbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const { data } =
        await axios.get(
          "http://localhost:5000/api/orders/seller-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          padding: 30,
          background: "#f4f7f4",
          minHeight: "100vh",
        }}
      >
        <h1>📦 My Orders</h1>

        {orders.length === 0 ? (
          <h3>No Orders Yet</h3>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 10,
                marginBottom: 20,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,.1)",
              }}
            >
              <h2>
                {order.productId?.name}
              </h2>

              <p>
                <b>Buyer:</b>{" "}
                {order.userId?.name}
              </p>

              <p>
                <b>Quantity:</b>{" "}
                {order.quantity} kg
              </p>

              <p>
                <b>Total:</b> ₹
                {order.totalAmount}
              </p>

              <p>
                <b>Status:</b>{" "}
                {order.orderStatus}
              </p>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
              >
                <option>
                  Pending
                </option>

                <option>
                  Processing
                </option>

                <option>
                  Shipped
                </option>

                <option>
                  Delivered
                </option>
              </select>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyOrders;