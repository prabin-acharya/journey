import Searchbar from "./Searchbar";
import Button from "./Button";

const Sidebar = ({ files, onClick }) => {
  const onClicked = (file) => onClick(file);
  const journal = {
    id: 0,
    title: "My Journal",
    content: "TODO: Complete the Journal Project.",
  };

  return (
    <div className="sidebar">
      <h2>Prabin's journey</h2>

      <Searchbar />

      <Button text="Daily Journal" onClick={() => onClicked(journal)} />

      <div className="files">
        <ul>
          {files.map((file) => (
            <Button
              key={file.id}
              text={file.title}
              onClick={() => onClicked(file)}
            />
          ))}
        </ul>
      </div>

      <Button text="Add Page" onClick={() => onClicked("AddPage")} />
    </div>
  );
};

export default Sidebar;
