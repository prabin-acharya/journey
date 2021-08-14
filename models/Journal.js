const mongoose = require("mongoose");

const JournalSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("journal", JournalSchema);
