import { useState, useEffect } from "react";
import AddNote from "./AddNote";
import Note from "./Note";
import { FaTimes } from "react-icons/fa";

const Journal = ({ search }) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState(notes);

  const fetchJournal = () => {
    fetch("/api/journal", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  };

  useEffect(() => {
    fetchJournal();
  }, []);

  useEffect(() => {
    if (!search) setSearchedNotes(notes);
    else {
      const notesWithTopics = notes.filter((note) => note.topics);
      setSearchedNotes(
        notesWithTopics.filter((note) => {
          return note.topics.filter(
            (topic) => topic.toUpperCase().indexOf(search.toUpperCase()) > -1
          ).length;
        })
      );
    }
  }, [search, notes]);

  return (
    <div className="journal">
      <span className="name">
        <h1>Journal</h1>
      </span>
      <p>
        Document your journey- thoughts, ideas, daily happenings. Keep track of
        your progress, take notes.
      </p>
      <button className="btn" onClick={() => setShowAddNote(!showAddNote)}>
        {showAddNote ? <FaTimes /> : "Add note"}
      </button>
      {showAddNote && <AddNote fetchJournal={fetchJournal} />}
      <br />
      {searchedNotes[0] && searchedNotes.map((note) => Note(note))}
    </div>
  );
};

export default Journal;
