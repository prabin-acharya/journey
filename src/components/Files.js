import Button from "./Button";

const Files = ({ files, onClick }) => {
  const onClicked = (file) => onClick(file);
  return (
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
  );
};

export default Files;
