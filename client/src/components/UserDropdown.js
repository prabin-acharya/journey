import React from "react";
import { BiLogOut } from "react-icons/bi";

const UserDropdown = ({ user, setAuthStatus }) => {
  return (
    <div className="user-profile-dropdown">
      <h2>{user.name}</h2>
      {user.email}
      <br />
      Log Out
      <BiLogOut
        onClick={() => {
          localStorage.removeItem("token");
          setAuthStatus(false);
        }}
      />
    </div>
  );
};

export default UserDropdown;
