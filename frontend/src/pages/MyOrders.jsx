import React, {
  useEffect,
  useState,
} from "react";
import API from "../api";
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
        await API.get(
          "/api/orders/seller-orders",
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

      await API.put(
        `/api/orders/${id}`,
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return { bg: '#fff3cd', color: '#856404', icon: '⏳' };
      case 'Processing':
        return { bg: '#cce5ff', color: '#004085', icon: '🔄' };
      case 'Shipped':
        return { bg: '#d4edda', color: '#155724', icon: '🚚' };
      case 'Delivered':
        return { bg: '#d1ecf1', color: '#0c5460', icon: '✅' };
      default:
        return { bg: '#f8f9fa', color: '#383d41', icon: '📋' };
    }
  };

  return (
    <>
      <FarmerNavbar />

      <div
        style={{
          padding: "30px",
          background: "#f0f3f0",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            background: "white",
            padding: "20px 30px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "32px",
              color: "#0b3d0b",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{ fontSize: "36px" }}>📦</span>
              My Orders
              <span style={{
                fontSize: "16px",
                background: "#0b3d0b",
                color: "white",
                padding: "4px 14px",
                borderRadius: "20px",
                marginLeft: "10px",
                fontWeight: "500"
              }}>
                {orders.length}
              </span>
            </h1>
            <div style={{
              display: "flex",
              gap: "8px"
            }}>
              <span style={{
                background: "#fff3cd",
                color: "#856404",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                ⏳ Pending
              </span>
              <span style={{
                background: "#d4edda",
                color: "#155724",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                ✅ Delivered
              </span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              padding: "80px 40px",
              borderRadius: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              textAlign: "center"
            }}>
              <span style={{ fontSize: "72px", marginBottom: "20px" }}>📭</span>
              <h3 style={{ color: "#333", marginBottom: "10px" }}>No Orders Yet</h3>
              <p style={{ color: "#666", fontSize: "16px" }}>
                You haven't received any orders yet. Share your products to start selling!
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gap: "24px"
            }}>
              {orders.map((order) => {
                const statusStyle = getStatusColor(order.orderStatus);
                return (
                  <div
                    key={order._id}
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      border: "1px solid #f0f0f0"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #0b3d0b, #1a6b1a)",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <h3 style={{
                          margin: 0,
                          color: "white",
                          fontSize: "22px",
                          fontWeight: "600"
                        }}>
                          {order.productId?.name}
                        </h3>
                        <div style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "14px",
                          marginTop: "4px"
                        }}>
                          Order #{order._id.slice(-8).toUpperCase()}
                        </div>
                      </div>
                      <div style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        padding: "8px 16px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: "600",
                        fontSize: "14px"
                      }}>
                        <span>{statusStyle.icon}</span>
                        {order.orderStatus}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "24px" }}>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                        marginBottom: "20px"
                      }}>
                        <div style={{
                          background: "#f8f9fa",
                          padding: "14px",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef"
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>👤 Buyer</div>
                          <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
                            {order.userId?.name}
                          </div>
                        </div>

                        <div style={{
                          background: "#f8f9fa",
                          padding: "14px",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef"
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>📦 Quantity</div>
                          <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
                            {order.quantity} kg
                          </div>
                        </div>

                        <div style={{
                          background: "#f8f9fa",
                          padding: "14px",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef"
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>💰 Total Amount</div>
                          <div style={{ fontSize: "18px", fontWeight: "700", color: "#0b3d0b" }}>
                            ₹{order.totalAmount}
                          </div>
                        </div>

                        <div style={{
                          background: "#f8f9fa",
                          padding: "14px",
                          borderRadius: "10px",
                          border: "1px solid #e9ecef"
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>📅 Order Date</div>
                          <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Status Update Section */}
                      <div style={{
                        background: "#f8f9fa",
                        padding: "16px 20px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                        border: "1px solid #e9ecef"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}>
                          <span style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#555"
                          }}>
                            Update Status:
                          </span>
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              border: "2px solid #ddd",
                              background: "white",
                              fontSize: "14px",
                              fontWeight: "500",
                              cursor: "pointer",
                              outline: "none",
                              transition: "all 0.3s ease",
                              minWidth: "150px"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.borderColor = "#0b3d0b";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.borderColor = "#ddd";
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#0b3d0b";
                              e.target.style.boxShadow = "0 0 0 3px rgba(11, 61, 11, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#ddd";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <option value="Pending">⏳ Pending</option>
                            <option value="Processing">🔄 Processing</option>
                            <option value="Shipped">🚚 Shipped</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                        </div>
                        <div style={{
                          fontSize: "13px",
                          color: "#888",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}>
                          <span>🔄</span>
                          Last updated: {new Date(order.updatedAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;