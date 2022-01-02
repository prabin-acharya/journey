const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  topics: { type: Array },
  content: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("page", PageSchema);
