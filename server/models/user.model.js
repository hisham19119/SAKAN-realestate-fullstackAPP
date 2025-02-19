const mongoose = require("mongoose");
const userRoles = require("../utils/userRoles");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "أدخل اسم المستخدم للإستمرار"],
    // unique: true,
  },
  password: {
    type: String,
    required: [true, "أدخل الرقم السري للإستمرار"],
  },
  email: {
    type: String,
    required: [true, "أدخل البريد الإليكتروني للإستمرار"],
    unique: true,
  },
  token: {
    type: String,
    default: undefined,
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER,
    required: [true, "أختر نوع الحساب للإستمرار"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
