import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`
      );

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'admin':
        return { bg: '#fef3c7', color: '#92400e' };
      case 'farmer':
        return { bg: '#d1fae5', color: '#065f46' };
      case 'consumer':
        return { bg: '#dbeafe', color: '#1e40af' };
      default:
        return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return '👑';
      case 'farmer':
        return '👨‍🌾';
      case 'consumer':
        return '🛒';
      default:
        return '👤';
    }
  };

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
              <span style={{ fontSize: "36px" }}>👥</span>
              Users Management
              <span style={{
                fontSize: "16px",
                background: "#f3f4f6",
                color: "#6b7280",
                padding: "4px 14px",
                borderRadius: "20px",
                fontWeight: "500",
                marginLeft: "8px"
              }}>
                Total: {users.length}
              </span>
            </h1>
            <p style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: "16px"
            }}>
              Manage all registered users across the platform
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>👥</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Total Users</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>{users.length}</h2>
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>👨‍🌾</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Farmers</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>
                {users.filter(u => u.role === 'farmer').length}
              </h2>
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Consumers</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>
                {users.filter(u => u.role === 'consumer').length}
              </h2>
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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>👑</div>
              <h3 style={{ margin: 0, color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>Admins</h3>
              <h2 style={{ margin: "8px 0 0 0", color: "#14532d", fontSize: "32px" }}>
                {users.filter(u => u.role === 'admin').length}
              </h2>
            </div>
          </div>

          {/* Users Table */}
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
              alignItems: "center"
            }}>
              <h3 style={{ margin: 0, color: "#14532d", fontSize: "18px" }}>
                📋 Registered Users
              </h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280"
              }}>
                <span>🔄</span>
                <span>{users.length} users found</span>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "600px"
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
                      👤 Name
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                      📧 Email
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>
                      🎯 Role
                    </th>

                    <th style={{ padding: "16px 20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>
                      ⚡ Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => {
                    const roleStyle = getRoleBadgeColor(user.role);
                    return (
                      <tr
                        key={user._id}
                        style={{
                          borderBottom: index === users.length - 1 ? "none" : "1px solid #f3f4f6",
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
                        <td
                          style={{
                            padding: "16px 20px",
                            fontWeight: "500",
                            color: "#1f2937"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #14532d, #1a6b1a)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "600",
                              fontSize: "14px"
                            }}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            {user.name}
                          </div>
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                            color: "#4b5563"
                          }}
                        >
                          {user.email}
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                          }}
                        >
                          <span style={{
                            background: roleStyle.bg,
                            color: roleStyle.color,
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            whiteSpace: "nowrap"
                          }}>
                            {getRoleIcon(user.role)} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>

                        <td
                          style={{
                            padding: "16px 20px",
                            textAlign: "center"
                          }}
                        >
                          <button
                            onClick={() =>
                              deleteUser(user._id)
                            }
                            style={{
                              background: "#fee2e2",
                              color: "#dc2626",
                              border: "none",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "14px",
                              transition: "all 0.3s ease",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#dc2626";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#fee2e2";
                              e.currentTarget.style.color = "#dc2626";
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#f9fafb"
              }}>
                <div style={{ fontSize: "64px", marginBottom: "15px" }}>👥</div>
                <h3 style={{ color: "#1f2937", marginBottom: "10px" }}>No Users Found</h3>
                <p style={{ color: "#6b7280", margin: 0 }}>
                  No registered users on the platform yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;