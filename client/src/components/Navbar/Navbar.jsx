import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.scss";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="main">
      <div className="logo">
        <h2>
          DonateThe
          <span>MEAL</span>
        </h2>
      </div>

      <div className={showMenu ? "nav-items mobile-menu-link" : "nav-items"}>
        <ul>
          <li>
            <Link style={{ fontSize: "1.5rem" }} to="/">
              Home
            </Link>
          </li>
          <li>
            <a style={{ fontSize: "1.5rem" }} href="#aboutus">
              About Us
            </a>
          </li>
          <li>
            <a style={{ fontSize: "1.5rem" }} href="#vision">
              Our Work
            </a>
          </li>
          <li>
            <Link
              to="/admin-login"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 ml-4 border-none"
              style={{ fontSize: "1.5rem" }}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>

      <div className="header-login">
        {isLoggedIn ? (
          <div className="l-btn">
            <Link className="link" to="/dashboard">
              <button className="btn-nav">Dashboard</button>
            </Link>
            <button className="btn-nav" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="l-btn">
            <Link className="link" to="/login">
              <button className="btn-nav">Login</button>
            </Link>
            <Link className="link" to="/signup">
              <button className="btn-nav">Signup</button>
            </Link>
          </div>
        )}

        <div className="hamburger-menu">
          <a href="#" onClick={handleClick}>
            <GiHamburgerMenu />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
