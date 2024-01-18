// src/MobileMenu.js
import React from "react";
import { Link } from "react-router-dom";

function MobileMenu() {
  return (
    <div className="mobile-menu">
      <Link to="#">Profile</Link>
      <Link to="#">Settings</Link>
      <Link to="#">Logout</Link>
    </div>
  );
}

export default MobileMenu;
