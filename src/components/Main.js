import AddPage from "./AddPage";
import File from "./File";

const Main = ({ file }) => {
  return (
    <div className="main">
      Inside Main component
      {file === "AddPage" ? <AddPage /> : <File file={file} />}
    </div>
  );
};

export default Main;
