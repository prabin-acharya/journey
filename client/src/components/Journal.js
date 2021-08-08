import AddNote from "./AddNote";

const Journal = ({ notes, onAddNote }) => {
  console.log(notes);
  return (
    <div>
      <AddNote onAddNote={onAddNote} />
      <br />
      {notes.map((note) => (
        <>
          <h4>{note.Date}</h4>
          <b>{note.content}</b>
          <hr />
          <br />
        </>
      ))}
    </div>
  );
};

export default Journal;
