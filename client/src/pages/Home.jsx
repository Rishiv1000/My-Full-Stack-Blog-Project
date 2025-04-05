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
    <div className="home-container">
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img
                src={`../upload/${post.img}`}
                alt={post.title}
              />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button className="button">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
        .home-container {
          display: flex;
          flex-direction: column;
          background-color: #121212;
          color: white;
          padding: 20px;
          min-height: 100vh;
          padding-top: 60px;
        }

        .posts-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .post {
          background-color: #1f1f1f;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease-in-out;
          height: 450px; /* Increased height */
          display: flex;
          flex-direction: column;
        }

        .post:hover {
          transform: translateY(-10px);
        }

        .img img {
          width: 100%;
          height: 250px; /* Increased image height */
          object-fit: cover;
        }

        .content {
          padding: 20px;
          flex-grow: 1; /* Ensure content grows and pushes button to the bottom */
        }

        h1 {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 10px;
          font-family: Arial, sans-serif;
        }

        p {
          color: #b0b0b0;
          font-size: 1rem;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .button {
          background-color: #6200ea;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #3700b3;
        }

        .link {
          text-decoration: none;
          color: inherit;
        }

        .link:hover {
          color: #6200ea;
        }

        /* Media query for smaller screens */
        @media (max-width: 768px) {
          .posts-container {
            grid-template-columns: 1fr; /* Switch to 1 column for smaller screens */
          }
          .post {
            height: 400px; /* Adjust height for smaller screens */
          }
        }
        `}
      </style>
    </div>
  );
};

export default Home;
