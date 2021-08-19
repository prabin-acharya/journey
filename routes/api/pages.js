const express = require("express");
const router = express.Router();
const Page = require("../../models/Page");
const auth = require("../../middleware/auth");

//@route  GET api/pages
//@desc   Get user's pages
//@access Private
router.get("/", auth, (req, res) => {
  Page.find({ userid: req.user.id })
    .sort({ Date: 1 })
    .then((pages) => res.json(pages));
});

//@route  POST api/pages
//@desc   Save a page
//@access Private
router.post("/", auth, (req, res) => {
  const newPage = new Page({
    userid: req.user.id,
    title: req.body.title,
    content: req.body.content,
  });
  newPage.save().then((page) => res.json(page));
});

//@route  Put api/pages/id
//@desc   Update the page
//@access Private
router.put("/:id", auth, async (req, res) => {
  try {
    await Page.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      () => {
        res.json({ success: true });
      }
    );
  } catch (err) {
    res.status(404).json({ success: false });
  }
});

//@route  POST api/pages/id
//@desc   Delete the page
//@access Private
router.delete("/:id", auth, (req, res) => {
  Page.findById(req.params.id)
    .then((page) => page.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
