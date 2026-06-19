import React, { useState, useEffect } from "react";
import axios from "axios";

const Community = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/posts"
      );

      console.log("POSTS RECEIVED:", data);

      setPosts(data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/posts",
        {
          content,
          imageUrl: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      setContent("");

      fetchPosts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  console.log("Current Posts State:", posts);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>👨‍🌾 Community Feed</h1>

      <form onSubmit={createPost}>
        <textarea
          rows="5"
          placeholder="What's happening on your farm?"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <br />
        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#0b3d0b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>Recent Posts</h2>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              background: "white",
              padding: "20px",
              marginTop: "15px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h4>👨‍🌾 Farmer</h4>

            <p
              style={{
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              {post.content}
            </p>

            <small>
              {new Date(
                post.createdAt
              ).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Community;