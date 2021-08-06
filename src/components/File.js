const File = ({ file }) => {
  return (
    <div>
      <h1>{file.title}</h1>
      <hr />
      <br />
      <p>{file.content}</p>
    </div>
  );
};

export default File;
