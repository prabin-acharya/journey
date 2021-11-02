import React from "react";

const UserDropdown = ({ user }) => {
  return (
    <div className="user-profile-dropdown">
      <h2>{user.name}</h2>
      {user.email}
      <br />
      Log Out
    </div>
  );
};

export default UserDropdown;
