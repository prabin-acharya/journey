const express = require("express");
const router = express.Router();
const Page = require("../../models/Page");
const auth = require("../../middleware/auth");
const initialPage = require("../../utils/initialPages.js");

//@route  GET api/pages
//@desc   Get user's pages
//@access Private
router.get("/", auth, (req, res) => {
  Page.find({ userid: req.user.id })
    .then((pages) => {
      return res.json(pages);
    })
    .catch((err) => console.log(err));
});

//@route  GET api/pages/:id
//@desc   Get a page
//@access Private
router.get("/:id", auth, (req, res) => {
  Page.findOne({ _id: req.params.id })
    .then((page) => {
      return res.json(page);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/pages
//@desc   Save Pages  for new User
//@access Private
router.post("/", auth, (req, res) => {
  const newPage = new Page({
    userid: req.user.id,
    ...initialPage,
  });

  newPage
    .save()
    .then((data) => {
      console.log(data);
      res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

//@route  PUT api/pages
//@desc   Save a new page
//@access Private
router.put("/", auth, (req, res) => {
  const newPage = new Page({
    userid: req.user.id,
    title: req.body.title,
    topics: req.body.topics,
    content: req.body.content,
  });

  newPage
    .save()
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

//@route  Put api/pages/id
//@desc   Update the page
//@access Private
router.put("/:id", auth, (req, res) => {
  Page.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        title: req.body.title,
        topics: req.body.topics,
        content: req.body.content,
        lastEdit: Date.now(),
      },
    }
  )
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => res.status(404).json({ success: false, err }));
});

//@route  PUT api/pages/pin/id
//@desc   Pin/Unpin the page
//@access Private
router.put("/pin/:id", auth, (req, res) => {
  Page.updateOne({ _id: req.params.id }, [
    { $set: { pinned: { $not: "$pinned" } } },
  ])
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => res.status(404).json({ success: false, err }));
});

//@route  POST api/pages/id
//@desc   Delete the page
//@access Private
router.delete("/:id", auth, (req, res) => {
  Page.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => res.status(404).json({ success: false, err }));
});

module.exports = router;
