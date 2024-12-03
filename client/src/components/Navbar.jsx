import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import styled from "styled-components";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout} className="auth-link">Logout</span>
          ) : (
            <Link className="link auth-link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </NavbarContainer>
  );
};

// Styled-components for the Navbar

const NavbarContainer = styled.div`
  background: linear-gradient(45deg, black, green);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;
  padding: 10px 20px;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    height: 40px; /* Adjust logo size */
    width: auto;
  }

  .links {
    display: flex;
    align-items: center;
  }

  .links .link {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
    cursor: pointer; /* Change cursor to pointer */
  }

  .links .link:hover {
    color: #ff80ab; /* Lighter pink when hovered */
  }

  .links h6 {
    color: #fff;
    margin: 0;
    font-size: 16px;
  }

  .links span {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-right: 20px;
  }

  .links .auth-link {
    cursor: pointer; /* Change cursor to pointer for auth links */
  }

  .write .link {
    color: #fff;
    background: #ff4081;
    padding: 8px 20px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out;
  }

  .write .link:hover {
    background: #d5006d;
  }
`;

export default Navbar;
