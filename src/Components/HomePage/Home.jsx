import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nested from '../Comment/Nested';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/login'); // Adjust the path to the route you want to navigate to
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={handleLogoClick}></div>

        {/* Search Section */}
        <div className="navbar-search">
          <input type="text" placeholder=" Search..." />
          <i className="fas fa-search search-icon"></i>
        </div>

        {/* Profile Section */}
        <div className="navbar-profile">
          <div className="profile-pic"></div>
          <div className="language">English</div>
        </div>
      </nav>

      {/* Jumbotron for Menu Section */}
      <div className="main-container">
  <div className="navbar-jumbotron">
    <div className="menu-container">
   

      <Link to="/" className="fa-solid fa-house" title="Home"></Link>
      <Link to="/Comments" className="fa-solid fa-pencil-alt" title="Edit"></Link>
      <Link to="/" className="fa-solid fa-user" title="Profile"></Link>
      <Link to="/" className="fa-solid fa-circle-info" title="Info"></Link>
      
    





    </div>
  </div>

  


</div>



    </>
  );
};

export default Navbar;
