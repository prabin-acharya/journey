const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Journal = require("../../models/Journal");
const initialNotes = require("../../utils/defaults.js");

//@route  GET api/journal
//@desc   Get user's notes
//@access Private
router.get("/", auth, (req, res) => {
  Journal.findOne({ userid: req.user.id })
    .then((journal) => {
      notes = journal.notes.reverse();
      return res.json(notes);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/journal
//@desc   Save a Journal for new User
//@access Private
router.post("/", auth, (req, res) => {
  const newJournal = new Journal({
    userid: req.user.id,
    notes: [...initialNotes],
  });
  newJournal.save().then((journal) => res.json(journal));
});

//@route  PUT api/journal
//@desc   Save a note to end of notes
//@access Private
router.put("/", auth, (req, res) => {
  const topics = req.body.content.match(/#\w+/g);
  const newNote = { content: req.body.content, topics };
  Journal.findOneAndUpdate(
    { userid: req.user.id },
    { $push: { notes: newNote } },
    (err, raw) => {
      if (err) {
        res.status(404).json({ success: false, err });
      } else {
        res.json({ success: true, raw });
      }
    }
  );
});

//@route  GET api/topics
//@desc   Get journal topics
//@access Private
router.get("/topics", auth, (req, res) => {
  Journal.find({ userid: req.user.id })
    .sort({ Date: -1 })
    .then((journal) => {
      topics = [...new Set([].concat(...journal.map((note) => note.topics)))];
      topics.pop();
      res.json(topics);
    });
});

module.exports = router;
