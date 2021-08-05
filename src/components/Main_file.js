const Main_file = ({ file }) => {
  return (
    <div>
      <h1>{file.title}</h1>
      <hr />
      <p>{file.content}</p>
    </div>
  );
};

export default Main_file;
