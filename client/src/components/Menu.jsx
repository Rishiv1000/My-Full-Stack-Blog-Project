import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const threeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.current.appendChild(renderer.domElement);

    // Add a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up on unmount
      threeRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const styles = {
    menu: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 1,
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    post: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    img: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={threeRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      <div style={styles.menu}>
        <h1 style={styles.heading}>Other posts you may like</h1>
        {posts.map((post) => (
          <div className="post" key={post.id} style={styles.post}>
            <img src={`../upload/${post?.img}`} alt="" style={styles.img} />
            <h2>{post.title}</h2>
            <button style={styles.button}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
