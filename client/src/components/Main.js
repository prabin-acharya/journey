import AddPage from "./AddPage";
import File from "./File";

const Main = ({ file, addPage }) => {
  return (
    <div className="main">
      Inside Main component
      {file === "AddPage" ? <AddPage onAdd={addPage} /> : <File file={file} />}
    </div>
  );
};

export default Main;
