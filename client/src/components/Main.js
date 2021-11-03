import { useState, useEffect, useRef } from "react";
import AddPage from "./AddPage";
import Page from "./Page";
import Journal from "./Journal";
import UserDropdown from "./UserDropdown";
import { FiMoreHorizontal } from "react-icons/fi";

const Main = ({
  page,
  setOpenPage,
  fetchPages,
  search,
  user,
  setAuthStatus,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userProfileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      userProfileRef.current &&
      !userProfileRef.current.contains(event.target)
    ) {
      setShowUserDropdown(false);
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
        onClick={() => setShowUserDropdown(true)}
        size={30}
        className="more-icon"
      />
      {showUserDropdown && (
        <div ref={userProfileRef}>
          <UserDropdown user={user} setAuthStatus={setAuthStatus} />
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
