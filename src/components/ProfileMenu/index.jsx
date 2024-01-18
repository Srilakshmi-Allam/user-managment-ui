import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../Auth/Authentication";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Custom hook to close the dropdown when user clicks outside
  useOutsideClick(dropdownRef, () => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    try {
      auth.logout();
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <div
        className={`profile-icon navbar-nav  ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <i className="bi bi-person-circle fs-3"></i>
      </div>

      {isMenuOpen && (
        <div className="menu">
          <Link to="#">
            <i className="bi bi-person"></i> Profile
          </Link>
          <Link to="/self-change-password">
            <i className="bi bi-gear"></i> Change Password
          </Link>
          <Link to="#" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
