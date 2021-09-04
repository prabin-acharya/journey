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
      <b>{localDateTime}</b>
      <span className="note-topics">{note.topics}</span>
      <br />
      {note.content}
    </div>
  );
};

export default Note;
