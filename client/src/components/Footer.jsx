import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  const styles = {
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      background: "#000", // Entire footer background is black
      color: "#fff", // Text color is white
      fontFamily: "'Arial', sans-serif",
    },
    logo: {
      height: "50px",
    },
    text: {
      fontSize: "16px",
    },
    heart: {
      color: "red", // Heart remains red for contrast
    },
    links: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "#fff", // White text color for the links
      textDecoration: "none",
      fontWeight: "bold",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#ff91a4", // Light pink hover color for links
    },
  };

  return (
    <footer style={styles.footer}>
      <img src={Logo} alt="Logo" style={styles.logo} />
      <span style={styles.text}>
        Made with <span style={styles.heart}>♥️</span> and <b>React.js</b>.
      </span>
      <div style={styles.links}>
        <a href="/about" style={styles.link}>
          About
        </a>
        <a href="/contact" style={styles.link}>
          Contact
        </a>
        <a href="/privacy" style={styles.link}>
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
