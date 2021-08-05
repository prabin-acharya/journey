import Main_file from "./Main_file";

const Main = ({ file }) => {
  return (
    <div className="main">
      Inside Main component
      <Main_file file={file} />
    </div>
  );
};

export default Main;
