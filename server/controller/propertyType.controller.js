const httpStatusText = require("../utils/httpStatusText");
const Type = require("../models/propertyType.model");

const createOne = async (req, res) => {
  console.log(req.body);
  const newType = new Type(req.body);
  await newType.save();
  res.json({ status: httpStatusText.SUCCESS, data: { newType } });
};

const getAll = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 100;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const types = await Type.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { types } });
};

const getOne = async (req, res) => {
  try {
    // console.log("Requested ID:", req.params.id);

    const type = await Type.findById(req.params.id);

    if (!type) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { message: "هذا النوع غير موجود" },
      });
    }

    return res.json({
      status: httpStatusText.SUCCESS,
      data: { type },
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
  const typeId = req.params.id;
  let updatedType;
  try {
    updatedType = await Type.updateOne(
      { _id: typeId },
      { $set: { ...req.body } }
    );

    if (!updatedType) {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { type: "هذا النوع غير موجود" },
      });
    }

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { updatedType: updatedType },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const deleteOne = async (req, res) => {
  const typeId = req.params.id;
  let deletedType;
  try {
    deletedType = await Type.deleteOne({ _id: typeId });
    if (deletedType.deletedCount === 1) {
      const types = await Type.find({}, { __v: false });
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { types },
      });
    } else {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { type: "هناك خطأ، لم يتم الحذف" },
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
