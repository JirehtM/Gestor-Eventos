const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Event", EventSchema);
