import File from "./File";

const DailyJournal = ({ onClick }) => {
  const file = {
    id: 0,
    title: "My Journal",
    content: "TODO: Complete the Journal Project.",
  };
  return (
    <div className="dailyjournal">
      <File key={file.id} file={file} onClick={onClick} />
    </div>
  );
};

export default DailyJournal;
