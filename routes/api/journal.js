const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Journal = require("../../models/Journal");

//@route  GET api/journal
//@desc   Get user's notes
//@access Private
router.get("/", auth, (req, res) => {
  Journal.find({ userid: req.user.id })
    .sort({ Date: -1 })
    .then((journal) => res.json(journal));
});

//@route  POST api/journal
//@desc   Save a note
//@access Private
router.post("/", auth, (req, res) => {
  const topics = req.body.content.match(/#\w+/g);
  const newJournal = new Journal({
    userid: req.user.id,
    topics,
    content: req.body.content,
  });
  newJournal.save().then((journal) => res.json(journal));
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
