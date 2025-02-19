const httpStatusText = require("../utils/httpStatusText");
const Location = require("../models/location.model");

const createOne = async (req, res) => {
  console.log(req.body);
  const newLocation = new Location(req.body);
  await newLocation.save();
  res.json({ status: httpStatusText.SUCCESS, data: { newLocation } });
};

const getAll = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 9;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const locations = await Location.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { locations } });
};

const getOne = async (req, res) => {
  try {
    console.log("Requested ID:", req.params.id);

    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { message: "هذه الوحدة غير موجودة" },
      });
    }

    return res.json({
      status: httpStatusText.SUCCESS,
      data: { location },
    });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.FAIL,
      message: "حدث خطأ أثناء جلب البيانات",
      error: err.message,
    });
  }
};

const updateOne = async (req, res) => {
  const locationId = req.params.id;
  let updatedLocation;
  try {
    updatedLocation = await Location.updateOne(
      { _id: locationId },
      { $set: { ...req.body } }
    );

    if (!updatedLocation) {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { Location: "هذه الوحدة غير موجودة" },
      });
    }

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { updatedLocation },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const deleteOne = async (req, res) => {
  const locationId = req.params.id;
  let deletedLocation;
  try {
    deletedLocation = await Location.deleteOne({ _id: locationId });
    if (deletedLocation.deletedCount === 1) {
      const locations = await Location.find({}, { __v: false });
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { locations },
      });
    } else {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { location: "هناك خطأ، لم يتم الحذف" },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "لم يتم الحذف",
    });
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
