import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPin } from "react-icons/bs";
import { RiDeleteBin6Line, RiPushpin2Fill } from "react-icons/ri";

const PageMenu = ({ page, fetchPages }) => {
  const navigate = useNavigate();

  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const localDateTime = (date) =>
    new Date(date).toLocaleString([], DATE_OPTIONS);

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
      <hr />
      <div className="page-activity">
        {page.lastEdit ? (
          <>
            Last edit on:
            <span className="page-activity-date">
              {localDateTime(page.lastEdit)}
            </span>
          </>
        ) : (
          <>
            Created at:
            <span className="page-activity-date">
              {localDateTime(page.Date)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default PageMenu;
