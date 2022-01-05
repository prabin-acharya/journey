import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import UserDropdown from "./../UserDropdown";
import Searchbar from "./Searchbar";
import { SearchBox } from "../SearchBox";
import ListItem from "./ListItem";

const Sidebar = ({
  pages,
  fetchPages,
  search,
  setSearch,
  user,
  setAuthStatus,
}) => {
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const userProfileRef = useRef(null);
  const searchRef = useRef(null);

  const urlPageId = location.pathname.split("/")[1].split("-").at(-1);

  const handleClickOutside = (event) => {
    if (
      userProfileRef.current &&
      !userProfileRef.current.contains(event.target)
    ) {
      setShowUserDropdown(false);
    }

    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchBox(false);
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

      <div onClick={() => setShowSearchBox(true)}>
        <Searchbar setSearch={setSearch} />
      </div>

      {showSearchBox && (
        <div ref={searchRef}>
          <SearchBox pages={pages} setShowSearchBox={setShowSearchBox} />
        </div>
      )}

      <Link to="/">
        <div
          id={location.pathname === "/" ? "button-clicked" : ""}
          className={"page-list"}
        >
          <strong>Daily Journal</strong>
        </div>
      </Link>

      {pages.filter((page) => page.pinned)[0] && (
        <div className="pages-sidebar-pinned">
          <span className="category">PINNED</span>
          <ul>
            {pages[0] &&
              pages
                .filter((page) => page.pinned)
                .map((page) => (
                  <li key={page._id}>
                    <Link
                      to={`/${page.title.replace(/\s+/g, "-")}-${page._id}`}
                    >
                      <ListItem
                        id={urlPageId === page._id ? "button-clicked" : ""}
                        key={page._id}
                        search={search}
                        text={page.title}
                        fetchPages={fetchPages}
                        page={page}
                        topics={page.topics}
                      />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      )}

      <div className="pages-sidebar">
        <span className="category">PAGES</span>
        <ul>
          {pages[0] &&
            pages
              .filter((page) => !page.pinned)
              .map((page) => (
                <li key={page._id}>
                  <Link to={`/${page.title.replace(/\s+/g, "-")}-${page._id}`}>
                    <ListItem
                      id={urlPageId === page._id ? "button-clicked" : ""}
                      key={page._id}
                      search={search}
                      text={page.title}
                      fetchPages={fetchPages}
                      page={page}
                      topics={page.topics}
                    />
                  </Link>
                </li>
              ))}
        </ul>
      </div>

      <Link to="AddPage">
        <div
          id={urlPageId === "AddPage" ? "button-clicked" : ""}
          className={"page-list"}
        >
          <strong>Add Page</strong>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
