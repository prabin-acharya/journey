const Journal = ({ journal }) => {
  return (
    <div>
      <h2>{journal.date}</h2>
      {journal.topics.forEach((topic) => {
        <b>topic</b>;
      })}
      <p>{journal.content}</p>
    </div>
  );
};

export default Journal;
