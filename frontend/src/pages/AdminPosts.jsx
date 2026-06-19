import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/posts"
      );

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/admin/posts/${id}`
      );

      alert("Post Deleted Successfully");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
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
        <h1>👨‍🌾 Community Posts</h1>

        {/* Posts Count */}
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
          <h3>Total Posts</h3>
          <h1>{posts.length}</h1>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "20px",
            }}
          >
            No Posts Found
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "20px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h3>
                👨‍🌾{" "}
                {post.farmerId?.name ||
                  "Farmer"}
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                {post.content}
              </p>

              <small
                style={{
                  color: "gray",
                }}
              >
                {new Date(
                  post.createdAt
                ).toLocaleString()}
              </small>

              <br />
              <br />

              <button
                onClick={() =>
                  deletePost(post._id)
                }
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete Post
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminPosts;