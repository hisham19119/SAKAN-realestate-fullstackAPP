const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "أدخل عنوان رئيسي للإستمرار"],
  },
  description: {
    type: String,
    required: [true, "أدخل الوصف للإستمرار"],
  },
  price: {
    type: Number,
    required: [true, "أدخل السعر للإستمرار"],
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: [true, "أدخل المكان للإستمرار"],
  },
  image: {
    type: String,
    required: [true, "أدخل الصورة للإستمرار"],
  },
  images: {
    type: [String],
    // required: [true, "أدخل صورة واحدة على الأقل"],
  },
  rooms: {
    type: Number,
    required: [true, "أدخل عدد الغرف للإستمرار"],
  },
  bathrooms: {
    type: Number,
    required: [true, "أدخل عدد الحمامات للإستمرار"],
  },
  area: {
    type: Number,
    required: [true, "أدخل المساحة للإستمرار"],
  },
  garages: {
    type: Number,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: [true, "أدخل نوع العقار للإستمرار"],
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

module.exports = mongoose.model("Property", propertySchema);
