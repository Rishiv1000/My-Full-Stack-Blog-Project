import React, { useEffect, useState, useContext } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState(null); // Initialize as null to handle loading state

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
        console.error(err);
        setPost({}); // Set to empty object if error occurs
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (post === null) {
    return <div>Loading...</div>; // Display loading state
  }

  // Ensure post properties are accessed safely
  const { username, userImg, img, date, title, desc, cat } = post;
  const isUserAuthenticated = currentUser && currentUser.username;

  return (
    <div className="single">
      <div className="content">
        {img && <img src={`../upload/${img}`} alt="" />}
        <div className="user">
          {userImg && <img src={userImg} alt="" />}
          <div className="info">
            {username ? (
              <>
                <span>{username}</span>
                <p>Posted {moment(date).fromNow()}</p>
              </>
            ) : (
              <span>No username available</span>
            )}
          </div>
          {username && isUserAuthenticated === username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{title || "No title available"}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(desc || ''),
          }}
        ></p>
      </div>
      <Menu cat={cat || 'Uncategorized'} />
    </div>
  );
};

export default Single;
