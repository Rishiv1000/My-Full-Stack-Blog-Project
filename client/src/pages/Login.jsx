import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  // Three.js Animation
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        void main() {
          vec3 colorA = vec3(0.1, 0.2, 0.6);
          vec3 colorB = vec3(0.1, 0.6, 1.0);
          vec3 color = mix(colorA, colorB, sin(time) * 0.5 + 0.5);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 1;

    const animate = () => {
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#000',
      position: 'relative',
    },
    form: {
      position: 'absolute',
      zIndex: 1,
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
      width: '90%',
      maxWidth: '400px',
      height: 'auto',
      boxSizing: 'border-box',
      marginTop: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '80%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #555',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: '#333',
      color: '#fff',
    },
    button: {
      backgroundColor: '#0069d9',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: '#ff6f61',
      fontWeight: 'bold',
      margin: '10px 0',
      fontSize: '16px',
    },
    link: {
      color: '#0698f9',
      textDecoration: 'none',
      fontSize: '16px',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
      <div style={styles.form}>
        <h1>Login</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            style={styles.input}
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            style={styles.input}
          />
          <button
            onClick={handleSubmit}
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            Login
          </button>
          {err && <p style={styles.error}>{err}</p>}
          <span style={{ fontSize: '16px' }}>
            {"  "}
            <Link
              to="/register"
              style={styles.link}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
