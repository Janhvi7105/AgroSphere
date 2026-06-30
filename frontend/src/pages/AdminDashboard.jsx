import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

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
      const usersRes = await API.get(
        "/api/admin/users"
      );

      const productsRes = await API.get(
        "/api/admin/products"
      );

      const postsRes = await API.get(
        "/api/admin/posts"
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
      const { data } = await API.get(
        "/api/admin/orders/stats"
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
    padding: isMobile ? "20px" : "30px",
    borderRadius: "20px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
    minHeight: isMobile ? "180px" : "220px",
  };

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          background: "#f4f7fc",
          minHeight: "100vh",
          padding: isMobile ? "20px" : "40px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: isMobile ? "30px" : "42px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          🛠 Admin Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
            textAlign: isMobile ? "center" : "left",
            fontSize: isMobile ? "15px" : "17px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
                fontSize: isMobile ? "34px" : "48px",
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
            padding: isMobile ? "18px" : "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "32px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            📊 System Summary
          </h2>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: "1.8",
            }}
          >
            👥 Registered Users:
            <strong> {users.length}</strong>
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: "1.8",
            }}
          >
            🛒 Listed Products:
            <strong> {products.length}</strong>
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: "1.8",
            }}
          >
            👨‍🌾 Community Posts:
            <strong> {posts.length}</strong>
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: "1.8",
            }}
          >
            📦 Total Orders:
            <strong> {orderStats.totalOrders}</strong>
          </p>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: "1.8",
            }}
          >
            💰 Total Revenue:
            <strong> ₹{orderStats.revenue}</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;