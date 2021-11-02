import { useState, useEffect, useRef } from "react";
import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";
import { FiMoreHorizontal } from "react-icons/fi";

const Main = ({ page, setOpenPage, fetchPages, search }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const userProfileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      userProfileRef.current &&
      !userProfileRef.current.contains(event.target)
    ) {
      setShowUserProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main">
      <FiMoreHorizontal
        onClick={() => setShowUserProfile(true)}
        size={30}
        className="more-icon"
      />
      {showUserProfile && (
        <div ref={userProfileRef} className="user-profile-dropdown">
          <h2>User Full Name</h2>
          useremail@domain.com
          <br />
          Log Out
        </div>
      )}

      {page === "Journal" ? (
        <Journal search={search} />
      ) : page === "AddPage" ? (
        <AddPage fetchPages={fetchPages} setOpenPage={setOpenPage} />
      ) : (
        <Page page={page} setOpenPage={setOpenPage} fetchPages={fetchPages} />
      )}
    </div>
  );
};

export default Main;
