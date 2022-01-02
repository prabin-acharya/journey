import { useState, useEffect } from "react";
import AddNote from "./AddNote";
import Note from "./Note";

const Journal = ({ search }) => {
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
      })
      .catch((err) => console.log(err));
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
      <div>
        Document your journey- thoughts, ideas, daily happenings.
        <br />
        Keep track of your progress, take notes.
      </div>
      <AddNote fetchJournal={fetchJournal} />
      {searchedNotes[0] && searchedNotes.map((note) => Note(note))}
    </div>
  );
};

export default Journal;
