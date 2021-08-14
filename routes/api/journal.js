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
  const newJournal = new Journal({
    userid: req.user.id,
    content: req.body.content,
  });
  newJournal.save().then((journal) => res.json(journal));
});

module.exports = router;
