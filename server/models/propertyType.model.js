const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "أدخل نوع العقار للإستمرار"],
    unique: true,
  },
});

module.exports = mongoose.model("Type", typeSchema);
