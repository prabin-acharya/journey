import Button from "./Button";

const DailyJournal = ({ onClick }) => {
  const file = {
    id: 0,
    title: "My Journal",
    content: "TODO: Complete the Journal Project.",
  };
  return (
    <div className="dailyjournal">
      <Button key={file.id} text={file.title} file={file} onClick={onClick} />
    </div>
  );
};

export default DailyJournal;
