import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const UserDropdown = ({ user, setAuthStatus }) => {
  return (
    <div className="user-profile-dropdown">
      <div className="user-details">
        <span className="user-profile-icon">
          <CgProfile size={30} color="#c4c4c1" />
        </span>
        <span classname="name-email">
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
