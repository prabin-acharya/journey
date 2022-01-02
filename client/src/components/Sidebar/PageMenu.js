import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPin } from "react-icons/bs";
import { RiDeleteBin6Line, RiPushpin2Fill } from "react-icons/ri";

const PageMenu = ({ page, fetchPages }) => {
  const navigate = useNavigate();

  const deletePage = () => {
    fetch(`/api/pages/${page._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        fetchPages().then(() => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  const pinPage = () => {
    fetch(`/api/pages/pin/${page._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        fetchPages();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page-menu-content">
      <div className="page-menu-item" onClick={() => pinPage()}>
        <RiPushpin2Fill className="page-menu-icon" />
        {page.pinned ? "Unpin" : "Pin"}
      </div>
      <div className="page-menu-item" onClick={() => deletePage()}>
        <RiDeleteBin6Line className="page-menu-icon" /> Delete
      </div>
    </div>
  );
};

export default PageMenu;
