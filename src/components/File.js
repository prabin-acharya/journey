const File = ({ file, onClick }) => {
  return (
    <div className="file">
      <button onClick={() => onClick(file)}>
        <b>{file.title}</b>
      </button>
    </div>
  );
};

export default File;
