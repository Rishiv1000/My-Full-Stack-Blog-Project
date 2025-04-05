import React, { useContext } from "react"; 
import { Link } from "react-router-dom"; 
import { AuthContext } from "../context/authContext"; 
import styled from "styled-components";

const Navbar = () => { 
  const { currentUser, logout } = useContext(AuthContext);

  return ( 
    <NavbarContainer> 
      <div className="container"> 
        <div className="logo"> 
          <Link to="/"> 
            <h1>BLog</h1> {/* New text logo */}
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
  background-color: black;  /* Solid black background */
  padding: 15px 40px;  /* Adjust padding for a thin navbar */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  /* Slight shadow for a thin, elevated effect */

  display: flex;
  justify-content: center;  /* Center all content horizontally */
  align-items: center;  /* Center all content vertically */

  .container {
    display: flex;
    justify-content: center;  /* Center all items in the container */
    align-items: center;  /* Vertically center the items */
    gap: 50px;
    width: 100%;
    max-width: 1200px;  /* Set a max-width for large screens */
  }

  .logo h1 {
    color: white;
    font-size: 24px; /* Smaller font size for a thin design */
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .links .link {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
    cursor: pointer;
  }

  .links .link:hover {
    color: #ff6f00;  /* Orange hover effect */
  }

  .links span {
    color: white;
    font-size: 14px;
    font-weight: 500;
    margin-right: 20px;
  }

  .links .auth-link {
    cursor: pointer;
  }

  .write .link {
    color: white;
    background: #ff6f00;
    padding: 5px 15px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out;
  }

  .write .link:hover {
    background: #e65100; /* Darker orange when hovered */
  }

  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;  /* Center the items on small screens */
      gap: 10px;
    }

    .links {
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export default Navbar;
