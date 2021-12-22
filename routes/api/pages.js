const express = require("express");
const router = express.Router();
const Page = require("../../models/Page");
const auth = require("../../middleware/auth");
const initialPages = require("../../utils/initialPages.js");

//@route  GET api/pages
//@desc   Get user's pages
//@access Private
router.get("/", auth, (req, res) => {
  Page.findOne({ userid: req.user.id })
    .then((pagesArray) => {
      pages = pagesArray.pages;
      return res.json(pages);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/pages
//@desc   Save Pages  for new User
//@access Private
router.post("/", auth, (req, res) => {
  const newPagesArray = new Page({
    userid: req.user.id,
    pages: [...initialPages],
  });
  newPagesArray.save().then((pages) => res.json(pages));
});

//@route  PUT api/pages
//@desc   Save a new page to array of pages
//@access Private
router.put("/", auth, (req, res) => {
  const newPage = {
    title: req.body.title,
    topics: req.body.topics,
    content: req.body.content,
  };
  Page.findOneAndUpdate(
    { userid: req.user.id },
    { $push: { pages: newPage } },
    { new: true },
    (err, raw) => {
      if (err) {
        res.status(404).json({ success: false, err });
      } else {
        res.json({ success: true, raw });
      }
    }
  );
});

//@route  Put api/pages/id
//@desc   Update the page
//@access Private
router.put("/:id", auth, async (req, res) => {
  try {
    await Page.updateOne(
      { userid: req.user.id, "pages._id": req.params.id },
      {
        $set: {
          "pages.$.title": req.body.title,
          "pages.$.topics": req.body.topics,
          "pages.$.content": req.body.content,
        },
      },
      (err, raw) => {
        if (err) {
          res.status(404).json({ success: false, err });
        } else {
          res.json({ success: true, raw });
        }
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
