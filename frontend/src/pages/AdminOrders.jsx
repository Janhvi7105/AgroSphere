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

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return { bg: '#fef3c7', color: '#92400e', icon: '⏳' };
      case 'processing':
        return { bg: '#dbeafe', color: '#1e40af', icon: '🔄' };
      case 'shipped':
        return { bg: '#d1fae5', color: '#065f46', icon: '🚚' };
      case 'delivered':
        return { bg: '#d1fae5', color: '#065f46', icon: '✅' };
      case 'cancelled':
        return { bg: '#fee2e2', color: '#991b1b', icon: '❌' };
      default:
        return { bg: '#f3f4f6', color: '#374151', icon: '📋' };
    }
  };

  // Get payment status color
  const getPaymentColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
        return { bg: '#d1fae5', color: '#065f46', icon: '✅' };
      case 'pending':
        return { bg: '#fef3c7', color: '#92400e', icon: '⏳' };
      case 'failed':
        return { bg: '#fee2e2', color: '#991b1b', icon: '❌' };
      default:
        return { bg: '#f3f4f6', color: '#374151', icon: '📋' };
    }
  };

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'delivered').length;
  const pendingOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'pending' || o.orderStatus?.toLowerCase() === 'processing').length;

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          padding: "40px 30px",
          background: "#f0f3f0",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: "30px",
            border: "1px solid #e8ece8"
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "32px",
              color: "#14532d",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{ fontSize: "36px" }}>📦</span>
              All Orders
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                {orders.length} Orders
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage and track all orders across the platform
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📋</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Orders</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{totalOrders}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>💰</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Revenue</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "28px" }}>₹{totalRevenue.toLocaleString()}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Delivered</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{deliveredOrders}</h2>
            </div>

            <div style={{
              background: "white",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: "1px solid #e8ece8",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Pending</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{pendingOrders}</h2>
            </div>
          </div>

          {/* Orders Table */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid #e8ece8",
              overflow: "hidden"
            }}
          >
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e8ece8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <h3 style={{ margin: 0, color: "#14532d", fontSize: "18px" }}>
                📋 Order List
              </h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280"
              }}>
                <span>🔄</span>
                <span>{orders.length} orders found</span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "#f9fafb"
              }}>
                <div style={{ fontSize: "72px", marginBottom: "15px" }}>📦</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px" }}>No Orders Found</h3>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  No orders have been placed on the platform yet.
                </p>
              </div>
            ) : (
              <>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      minWidth: "800px"
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                          color: "white",
                        }}
                      >
                        <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                          🛒 Product
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                          👤 Buyer
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                          👨‍🌾 Seller
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                          📊 Qty
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "right", fontWeight: "600", fontSize: "14px" }}>
                          💰 Total
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                          💳 Payment
                        </th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                          📋 Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order, index) => {
                        const statusStyle = getStatusColor(order.orderStatus);
                        const paymentStyle = getPaymentColor(order.paymentStatus);
                        
                        return (
                          <tr
                            key={order._id}
                            style={{
                              borderBottom: index === orders.length - 1 ? "none" : "1px solid #f3f4f6",
                              transition: "all 0.3s ease",
                              background: index % 2 === 0 ? "#ffffff" : "#fafbfc"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f0fdf4";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = index % 2 === 0 ? "#ffffff" : "#fafbfc";
                            }}
                          >
                            <td style={{
                              padding: "16px 20px",
                              fontWeight: "500",
                              color: "#1f2937"
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "18px" }}>🌾</span>
                                {order.productName || "Unknown Product"}
                              </div>
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              color: "#4b5563"
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>👤</span>
                                {order.buyer || "Unknown"}
                              </div>
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              color: "#4b5563"
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>👨‍🌾</span>
                                {order.seller || "Unknown"}
                              </div>
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              textAlign: "center",
                              fontWeight: "500",
                              color: "#1f2937"
                            }}>
                              {order.quantity || 0} kg
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              textAlign: "right",
                              fontWeight: "700",
                              color: "#14532d",
                              fontSize: "16px"
                            }}>
                              ₹{order.totalAmount?.toLocaleString() || 0}
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              textAlign: "center"
                            }}>
                              <span style={{
                                background: paymentStyle.bg,
                                color: paymentStyle.color,
                                padding: "4px 14px",
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "600",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                whiteSpace: "nowrap"
                              }}>
                                {paymentStyle.icon} {order.paymentStatus || "N/A"}
                              </span>
                            </td>

                            <td style={{
                              padding: "16px 20px",
                              textAlign: "center"
                            }}>
                              <span style={{
                                background: statusStyle.bg,
                                color: statusStyle.color,
                                padding: "6px 16px",
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "600",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                whiteSpace: "nowrap"
                              }}>
                                {statusStyle.icon} {order.orderStatus || "Pending"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div style={{
                  padding: "16px 24px",
                  borderTop: "1px solid #e8ece8",
                  background: "#f9fafb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>
                    Showing {orders.length} orders
                  </span>
                  <div style={{
                    display: "flex",
                    gap: "16px",
                    fontSize: "13px",
                    color: "#6b7280",
                    flexWrap: "wrap"
                  }}>
                    <span>📦 Total: {orders.reduce((sum, o) => sum + (o.quantity || 0), 0)} kg</span>
                    <span>•</span>
                    <span>💰 Revenue: ₹{totalRevenue.toLocaleString()}</span>
                    <span>•</span>
                    <span>✅ Delivered: {deliveredOrders}</span>
                    <span>•</span>
                    <span>⏳ Pending: {pendingOrders}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;