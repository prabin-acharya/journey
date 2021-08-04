import File from "./File";

const Files = ({ files }) => {
  return (
    <div className="files">
      <ul>
        {files.map((file) => (
          <File key={file.id} fileName={file.filename} />
        ))}
      </ul>
    </div>
  );
};

export default Files;
