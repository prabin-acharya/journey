import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./../UserDropdown";
import Searchbar from "./Searchbar";
import ListItem from "./ListItem";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = ({
  pages,
  setOpenPage,
  search,
  setSearch,
  openPage,
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

  const displayName = (user) => {
    const name = user.name;
    if (name.length > 8) {
      return name.substring(0, 8) + "'s.. Journey";
    } else {
      return name + "'s Journey";
    }
  };

  return (
    <div className="sidebar">
      <div className="user" onClick={() => setShowUserDropdown(true)}>
        {user && displayName(user)} <IoIosArrowDown />
      </div>
      {showUserDropdown && (
        <div ref={userProfileRef}>
          <UserDropdown user={user} setAuthStatus={setAuthStatus} />
        </div>
      )}

      <Searchbar search={search} setSearch={setSearch} />
      <Link to="/">
        <ListItem
          text="Daily Journal"
          onClick={() => setOpenPage("Journal")}
          id={openPage === "Journal" ? "button-clicked" : ""}
        />
      </Link>

      <div className="pages-sidebar">
        <ul>
          {pages[0] &&
            pages.map((page) => (
              <li>
                <Link to={`/${page.title}`}>
                  <ListItem
                    id={openPage._id === page._id ? "button-clicked" : ""}
                    key={page._id}
                    search={search}
                    text={page.title}
                    topics={page.topics}
                    onClick={() => setOpenPage(page)}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Link to="AddPage">
        <ListItem
          text="Add Page"
          onClick={() => setOpenPage("AddPage")}
          id={openPage === "AddPage" ? "button-clicked" : ""}
        />
      </Link>
    </div>
  );
};

export default Sidebar;
