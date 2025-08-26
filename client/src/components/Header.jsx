import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userInfo");

    if (token && userData) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const renderProfileIcon = () => {
    if (user?.profileImage) {
      return (
        <img
          src={user.profileImage}
          alt="Profile"
          className="profile-img"
          onClick={toggleDropdown}
        />
      );
    }

    const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";
    return (
      <div className="profile-letter" onClick={toggleDropdown}>
        {firstLetter}
      </div>
    );
  };

  return (
    <header className="modern-header">
      <div className="logo" onClick={() => navigate("/")}>
        Shop<span>Zone</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/deals">Deals</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      <div className="header-right">
        {isLoggedIn ? (
          <div className="profile-dropdown">
            {renderProfileIcon()}
            {isDropdownOpen && (
              <div className="dropdown-content">
                <p className="dropdown-username">Hello, {user?.name}</p>
                <button onClick={() => navigate("/profile")}>Manage Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
