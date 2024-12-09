import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div
      className="home"
      style={{
        background: "linear-gradient(to bottom, black, blue)",
        minHeight: "100vh",
        color: "white", // Ensures text is visible on the dark background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="posts"
        style={{
          width: "80%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {posts.map((post) => (
          <div
            className="post"
            key={post.id}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              margin: "20px 0",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="img" style={{ marginBottom: "15px" }}>
              <img
                src={`../upload/${post.img}`}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {post.title}
                </h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
