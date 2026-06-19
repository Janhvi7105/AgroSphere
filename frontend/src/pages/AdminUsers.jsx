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
        <h1>👥 Users Management</h1>

        {/* User Count Card */}
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
          <h3>Total Users</h3>
          <h1>{users.length}</h1>
        </div>

        {/* Users Table */}
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
                  Name
                </th>

                <th style={{ padding: "12px" }}>
                  Email
                </th>

                <th style={{ padding: "12px" }}>
                  Role
                </th>

                <th style={{ padding: "12px" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {user.name}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {user.email}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {user.role}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    <button
                      onClick={() =>
                        deleteUser(user._id)
                      }
                      style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              No Users Found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;