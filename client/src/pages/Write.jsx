import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      padding: "20px",
      gap: "20px",
      background: "linear-gradient(135deg, #ffffff 0%, #87CEEB 100%)", // Blue-white gradient
      minHeight: "100vh",
      fontFamily: "'Arial', sans-serif",
      color: "black", // Set all text color to black
    },
    content: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
      padding: "10px",
      fontSize: "18px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    editorContainer: {
      marginTop: "20px",
    },
    editor: {
      height: "200px",
      color: "black",
    },
    menu: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    item: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    labelFile: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#343a40", // Dark background color for buttons
      color: "#fff",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "#343a40", // Dark background color for buttons
      color: "#fff",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#495057",
    },
    cat: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    radioInput: {
      marginRight: "10px",
    },
    spacing: {
      marginBottom: "15px",
      display: "block",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <div style={styles.editorContainer}>
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            style={styles.editor}
          />
        </div>
      </div>
      <div style={styles.menu}>
        <div style={styles.item}>
          <h1>Publish</h1>
          <span style={styles.spacing}>
            <b>Status: </b> Draft
          </span>
          <span style={styles.spacing}>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" style={styles.labelFile}>
            Upload Image
          </label>
          <div style={styles.buttons}>
            <button style={styles.button}>Save as a draft</button>
            <button
              onClick={handleClick}
              style={styles.button}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.button.backgroundColor)
              }
            >
              Publish
            </button>
          </div>
        </div>
        <div style={styles.item}>
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map(
            (category) => (
              <div style={styles.cat} key={category}>
                <input
                  type="radio"
                  checked={cat === category}
                  name="cat"
                  value={category}
                  id={category}
                  onChange={(e) => setCat(e.target.value)}
                  style={styles.radioInput}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Write;
