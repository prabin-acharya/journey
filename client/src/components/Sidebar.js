import Searchbar from "./Searchbar";
import Button from "./Button";

const Sidebar = ({ pages, onClick }) => {
  const onClicked = (page) => onClick(page);
  const journal = {
    id: 0,
    title: "My Journal",
    content: "TODO: Complete the Journal Project.",
  };
  console.log(pages);

  return (
    <div className="sidebar">
      <h2>Prabin's journey</h2>

      <Searchbar />

      <Button text="Daily Journal" onClick={() => onClicked("Journal")} />

      <div className="pages">
        <ul>
          {pages.map((page) => (
            <Button
              key={page._id}
              text={page.title}
              onClick={() => onClicked(page)}
            />
          ))}
        </ul>
      </div>

      <Button text="Add Page" onClick={() => onClicked("AddPage")} />
    </div>
  );
};

export default Sidebar;
