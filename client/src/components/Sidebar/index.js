import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./../UserDropdown";
import Searchbar from "./Searchbar";
import ListItem from "./ListItem";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = ({ pages, search, setSearch, user, setAuthStatus }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userProfileRef = useRef(null);
  const location = useLocation();
  const urlPageId = location.pathname.split("/")[1].split("-").at(-1);
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
          id={location.pathname === "/" ? "button-clicked" : ""}
        />
      </Link>

      <div className="pages-sidebar">
        <ul>
          {pages[0] &&
            pages.map((page) => (
              <li key={page._id}>
                <Link to={`/${page.title.replace(/\s+/g, "-")}-${page._id}`}>
                  <ListItem
                    id={urlPageId === page._id ? "button-clicked" : ""}
                    key={page._id}
                    search={search}
                    text={page.title}
                    topics={page.topics}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Link to="AddPage">
        <ListItem
          text="Add Page"
          id={urlPageId === "AddPage" ? "button-clicked" : ""}
        />
      </Link>
    </div>
  );
};

export default Sidebar;
