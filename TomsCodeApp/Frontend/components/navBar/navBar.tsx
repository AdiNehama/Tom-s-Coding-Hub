import React from "react";
import { Link } from "react-router-dom"; // להשתמש בקישור של React Router
import "./navBar.css";

interface NavbarTitleProps {
  display: { xs: string; md: string };
  variant: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
}

const NavbarTitle = ({ display, variant }: NavbarTitleProps) => {
  return (
    <a href="/" className={`navbar-title ${variant} ${display.xs === "none" ? "hidden-xs" : ""}`}>
      <img
        src="/favicon.png"
        alt="Logo"
        className="navbar-icon"
      />
      <h1>{`Code With Tom !`}</h1>
    </a>
  );
};

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <NavbarTitle display={{ xs: "none", md: "flex" }} variant="h6" />
          <NavbarTitle display={{ xs: "flex", md: "none" }} variant="h5" />
        </div>
        <div className="navbar-links">
          <Link to="/about" className="navbar-link">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
