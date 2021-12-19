import Searchbar from "./Searchbar";
import Button from "./Button";

const Sidebar = ({ pages, setOpenPage, search, setSearch, openPage, user }) => {
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
                search={search}
                key={page._id}
                text={page.title}
                topics={page.topics}
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
