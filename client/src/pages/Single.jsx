import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.content}>
        <img src={`../upload/${post?.img}`} alt="" style={styles.image} />
        <div style={styles.user}>
          {post.userImg && <img src={post.userImg} alt="" style={styles.userImage} />}
          <div style={styles.userInfo}>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div style={styles.edit}>
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Edit" style={styles.icon} />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="Delete" style={styles.icon} />
            </div>
          )}
        </div>
        <h1 style={styles.title}>{post.title}</h1>
        <p
          style={styles.postText}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>

    </div> 
  );
};

// Inline Styles
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0d1b2a, #1e2a47)', // Blue-black gradient
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    width: '80%',
    maxWidth: '900px',
    padding: '30px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    marginRight: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    justifyContent: 'space-between',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    color: '#bbb',
  },
  edit: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  postText: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#ddd',
  },
  menu: {
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    margin: '10px 0',
  },
  menuLink: {
    textDecoration: 'none',
    color: '#bbb',
    fontSize: '18px',
  },
  menuLinkHover: {
    textDecoration: 'underline',
  },
};

export default Single;
