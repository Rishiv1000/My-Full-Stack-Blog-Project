import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import * as THREE from "three";

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

  const sliderImages = [
    "https://images.pexels.com/photos/834897/pexels-photo-834897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/851213/pexels-photo-851213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Refs for Three.js container
  const threeJsContainerRef = useRef();

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeJsContainerRef.current.appendChild(renderer.domElement);

    // Add a rotating cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate cube for animation effect
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Timeout to stop rendering and hide the canvas after 4 seconds
    setTimeout(() => {
      cancelAnimationFrame(animate);
      threeJsContainerRef.current.style.opacity = 0; // Fade out after 4 seconds
    }, 4000);

    // Timeout to show the Three.js canvas with a fade-in effect over 2 seconds
    setTimeout(() => {
      threeJsContainerRef.current.style.visibility = "visible"; // Make visible
      threeJsContainerRef.current.style.transition = "opacity 2s ease-in-out";
      threeJsContainerRef.current.style.opacity = 1; // Fade in over 2 seconds
    }, 1000); // Delay the fade-in by 1 second for smoother effect

    // Adjust Three.js canvas on window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  // Styles with dark gradient and animation
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg, #2e2e2e 30%, #1c1c1c 100%)", // Dark gradient
      minHeight: "100vh",
      overflow: "hidden",
      position: "relative", // Needed to stack Three.js canvas below other elements
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "linear-gradient(90deg, rgba(0, 138, 255, 1) 0%, rgba(0, 72, 144, 1) 100%)",
      padding: "10px 20px",
      color: "#fff",
      zIndex: 10, // Keeps the navbar on top of the 3D background
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
    },
    welcome: {
      background: "linear-gradient(135deg, rgba(55, 44, 78, 0.9), rgba(150, 102, 255, 0.8))",
      padding: "40px 20px",
      textAlign: "center",
      zIndex: 5,
    },
    welcomeHeading: {
      fontSize: "36px",
      marginBottom: "20px",
      color: "#ff8a00",
    },
    welcomeText: {
      fontSize: "18px",
      lineHeight: "1.6",
      marginBottom: "20px",
      color: "#fff",
    },
    welcomeLink: {
      color: "#ff8a00",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px",
    },
    slider: {
      margin: "40px 0",
    },
    sliderContainer: {
      display: "flex",
      width: "99%",
      height: "350px",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
    },
    sliderImage: {
      scrollSnapAlign: "start",
      marginRight: "10px",
      borderRadius: "10px",
      objectFit: "cover",
    },
    posts: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    post: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    postImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderBottom: "1px solid #ddd",
    },
    postContent: {
      padding: "20px",
    },
    postTitle: {
      fontSize: "24px",
      marginBottom: "10px",
      color: "#333",
    },
    postDescription: {
      fontSize: "16px",
      color: "#666",
      lineHeight: "1.6",
    },
    readMoreButton: {
      background: "linear-gradient(90deg, rgba(0, 138, 255, 1) 0%, rgba(0, 72, 144, 1) 100%)",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    readMoreButtonHover: {
      background: "linear-gradient(90deg, rgba(0, 72, 144, 1) 0%, rgba(0, 138, 255, 1) 100%)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Three.js background */}
      <div
        ref={threeJsContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0, // Initially hidden
          visibility: "hidden", // Initially hidden
        }}
      ></div>

      {/* Welcome Section */}
      <div style={styles.welcome}>
        <h1 style={styles.welcomeHeading}>Welcome to Our Blog</h1>
        <p style={styles.welcomeText}>
          Explore our latest articles on various topics. Join our community
          and start reading today.
        </p>
        <p>
          Ready to dive in?{" "}
          <Link to="/blog" style={styles.welcomeLink}>
            Start Reading
          </Link>
        </p>
      </div>

      {/* Slider */}
      <div style={styles.slider}>
        <div style={styles.sliderContainer}>
          {sliderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={styles.sliderImage}
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      <div style={styles.posts}>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div style={styles.post} key={post.id}>
              <div className="img">
                <img
                  src={`../upload/${post.img}`}
                  alt=""
                  style={styles.postImage}
                />
              </div>
              <div style={styles.postContent}>
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 style={styles.postTitle}>{post.title}</h1>
                </Link>
                <p style={styles.postDescription}>{getText(post.desc)}</p>
                <button style={styles.readMoreButton}>Read More</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
