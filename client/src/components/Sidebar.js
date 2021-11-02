import Searchbar from "./Searchbar";
import Button from "./Button";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({
  pages,
  setOpenPage,
  search,
  setSearch,
  openPage,
  setAuthStatus,
  user,
}) => {
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
      <div className="user">
        <h2> {user && displayName(user)}</h2>

        <button
          id="logout"
          title="Log Out"
          onClick={() => {
            localStorage.removeItem("token");
            setAuthStatus(false);
          }}
        >
          <BiLogOut className="bi-lg" size="25px" type="logo" />
        </button>
      </div>
      <Searchbar search={search} setSearch={setSearch} />
      <Button
        text="Daily Journal"
        onClick={() => setOpenPage("Journal")}
        id={openPage === "Journal" ? "button-clicked" : ""}
      />

      <div className="pages-sidebar">
        <ul>
          {pages[0] &&
            pages.map((page) => (
              <Button
                id={openPage._id === page._id ? "button-clicked" : ""}
                key={page._id}
                text={page.title}
                onClick={() => setOpenPage(page)}
              />
            ))}
        </ul>
      </div>

      <Button
        text="Add Page"
        onClick={() => setOpenPage("AddPage")}
        id={openPage === "AddPage" ? "button-clicked" : ""}
      />
    </div>
  );
};

export default Sidebar;
