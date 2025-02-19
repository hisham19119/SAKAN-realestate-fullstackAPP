const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "أدخل المكان للإستمرار"],
    unique: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
