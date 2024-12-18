import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navBar.css";

interface NavbarTitleProps {
  display: { xs: string; md: string };
  variant: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
}

const NavbarTitle = ({ display, variant }: NavbarTitleProps) => {
  return (
    <a href="/" className={`navbar-title ${variant} ${display.xs === "none" ? "hidden-xs" : ""}`}>
      <img src="/favicon.png" alt="Logo" className="navbar-icon" />
      <h1>{`Code With Tom`}</h1>
    </a>
  );
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [error, setError] = useState("");

  const handleAdminMode = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (password === "12345") {
      setIsAdmin(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setShowPasswordPrompt(false);
  };

  const handleStudentMode = () => {
    setIsAdmin(false);
    navigate("/");  
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <NavbarTitle display={{ xs: "none", md: "flex" }} variant="h6" />
          <NavbarTitle display={{ xs: "flex", md: "none" }} variant="h5" />
        </div>
        <div className="navbar-links">
          {!isAboutPage && <Link to="/about" className="navbar-link">About</Link>}
          {!isHomePage && <Link to="/" className="navbar-link">Back to Home Page</Link>}
          {isAdmin && <Link to="/create" className="navbar-link">Create a New Block Code</Link>}
          {!isAdmin && (
            <button onClick={handleAdminMode} className="navbar-link-buttom">
            Move To Admin Mode
            </button>
          )}
          {isAdmin && (
            <button onClick={handleStudentMode} className="navbar-link-buttom">
             Back To Student Mode
            </button>
          )}
        </div>
      </div>
      {showPasswordPrompt && (
        <div className="password-prompt">
          <p className="password-text">Password:</p>
          <input
            type="password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordSubmit((e.target as HTMLInputElement).value);
              }
            }}
          />
          <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Navbar;
