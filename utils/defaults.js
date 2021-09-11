const note1 = `Welcome to #Journey🙏.We are very excited to have you here🎉.Lets introduce you to the app❤️`;
const note2 = `This is Journal. Journal is a place where you record your thoughts, ideas, daily happenings.
You can just tap on "Add a Note" and start typing⌨️.    #Journal#Note`;
const note3 = `You can add topics to your note by simply typing "#" followed by the topic.
And you can search your Notes by Topics🔍 through searchbar in the sidebar.   #topics#search`;
const note4 = `Pages are for blog, essays. You can click on "Add Page" and start writing. #Pages`;
const topics = (content) => content.match(/#\w+/g);

const initialNotes = [
  { content: note4, topics: topics(note4) },
  { content: note3, topics: topics(note3) },
  { content: note2, topics: topics(note2) },
  { content: note1, topics: topics(note1) },
];

module.exports = initialNotes;
