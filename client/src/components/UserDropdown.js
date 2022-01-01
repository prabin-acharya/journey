import React from "react";
import { CgProfile } from "react-icons/cg";

const UserDropdown = ({ user, setAuthStatus }) => {
  return (
    <div className="user-profile-dropdown">
      <div className="user-details">
        <span className="user-profile-icon">
          <CgProfile size={30} color="#999999" />
        </span>
        <span className="name-email">
          <span className="user-name">{user.name}</span>
          <br />
          <span className="user-email">{user.email}</span>
        </span>
      </div>
      <hr />
      <div
        className="user-logout"
        onClick={() => {
          localStorage.removeItem("token");
          setAuthStatus(false);
        }}
      >
        Log Out
      </div>
    </div>
  );
};

export default UserDropdown;
