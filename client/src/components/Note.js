import Topics from "./Topics";

const Note = (note) => {
  const DATE_OPTIONS = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const localDateTime = new Date(note.Date).toLocaleString([], DATE_OPTIONS);

  return (
    <div className="note" key={note._id}>
      <div className="note-header">
        <b>{localDateTime}</b>
        <Topics topics={note.topics} />
      </div>
      {note.content}
    </div>
  );
};

export default Note;
