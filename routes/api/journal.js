const express = require("express");
const router = express.Router();

const Journal = require("../../models/Journal");

router.get("/", (req, res) => {
  Journal.find()
    .sort({ Date: -1 })
    .then((journal) => res.json(journal));
});

router.post("/", (req, res) => {
  const newJournal = new Journal({
    content: req.body.content,
  });
  newJournal.save().then((journal) => res.json(journal));
});

module.exports = router;
