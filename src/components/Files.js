import File from "./File";

const Files = ({ files, onClick }) => {
  return (
    <div className="files">
      <ul>
        {files.map((file) => (
          <File key={file.id} file={file} onClick={onClick} />
        ))}
      </ul>
    </div>
  );
};

export default Files;
