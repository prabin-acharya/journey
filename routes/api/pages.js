const express = require("express");
const router = express.Router();

const Page = require("../../models/Page");

const auth = require("../../middleware/auth");

router.get("/", (req, res) => {
  Page.find()
    .sort({ Date: 1 })
    .then((pages) => res.json(pages));
});

router.post("/", (req, res) => {
  const newPage = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  newPage.save().then((page) => res.json(page));
});

router.delete("/:id", (req, res) => {
  Page.findById(req.params.id)
    .then((page) => page.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
