import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      const productsRes = await axios.get(
        "http://localhost:5000/api/admin/products"
      );

      const postsRes = await axios.get(
        "http://localhost:5000/api/admin/posts"
      );

      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setPosts(postsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderStats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders/stats"
      );

      setOrderStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOrderStats();
  }, []);

  const cardStyle = {
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          background: "#f4f7fc",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          🛠 Admin Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Manage Users, Products and Community Posts
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {/* Users Card */}
          <div
            style={{
              ...cardStyle,
              background: "#4F46E5",
            }}
            onClick={() =>
              navigate("/admin-users")
            }
          >
            <h2>👥 Users</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {users.length}
            </h1>

            <p>View All Users</p>
          </div>

          {/* Products Card */}
          <div
            style={{
              ...cardStyle,
              background: "#10B981",
            }}
            onClick={() =>
              navigate("/admin-products")
            }
          >
            <h2>🛒 Products</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {products.length}
            </h1>

            <p>View All Products</p>
          </div>

          {/* Posts Card */}
          <div
            style={{
              ...cardStyle,
              background: "#F59E0B",
            }}
            onClick={() =>
              navigate("/admin-posts")
            }
          >
            <h2>👨‍🌾 Posts</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {posts.length}
            </h1>

            <p>View Community Posts</p>
          </div>

          {/* Orders Card */}
          <div
            style={{
              ...cardStyle,
              background: "#8B5CF6",
            }}
            onClick={() =>
              navigate("/admin-orders")
            }
          >
            <h2>📦 Orders</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {orderStats.totalOrders}
            </h1>

            <p>Total Orders</p>
          </div>
        </div>

        {/* Order Analytics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginTop: "25px",
          }}
        >
          {/* Revenue Card */}
          <div
            style={{
              ...cardStyle,
              background: "#059669",
              cursor: "default",
            }}
          >
            <h2>💰 Revenue</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              ₹{orderStats.revenue}
            </h1>

            <p>Total Revenue</p>
          </div>

          {/* Pending Orders Card */}
          <div
            style={{
              ...cardStyle,
              background: "#D97706",
              cursor: "default",
            }}
          >
            <h2>🟡 Pending</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {orderStats.pendingOrders}
            </h1>

            <p>Pending Orders</p>
          </div>

          {/* Delivered Orders Card */}
          <div
            style={{
              ...cardStyle,
              background: "#059669",
              cursor: "default",
            }}
          >
            <h2>✅ Delivered</h2>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              {orderStats.deliveredOrders}
            </h1>

            <p>Delivered Orders</p>
          </div>
        </div>

        {/* Quick Summary */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>📊 System Summary</h2>

          <p>
            👥 Registered Users:
            <strong> {users.length}</strong>
          </p>

          <p>
            🛒 Listed Products:
            <strong> {products.length}</strong>
          </p>

          <p>
            👨‍🌾 Community Posts:
            <strong> {posts.length}</strong>
          </p>

          <p>
            📦 Total Orders:
            <strong> {orderStats.totalOrders}</strong>
          </p>

          <p>
            💰 Total Revenue:
            <strong> ₹{orderStats.revenue}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;