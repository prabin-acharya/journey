const mongoose = require("mongoose");

const JournalSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  notes: [
    {
      topics: { type: Array },
      content: {
        type: String,
      },
      Date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("journal", JournalSchema);
