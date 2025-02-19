const httpStatusText = require("../utils/httpStatusText");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generate.JWT");

const createOne = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { user: "هذا المستخدم موجود بالفعل" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });
  await newUser.save();
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  res.json({ status: httpStatusText.SUCCESS, data: { newUser } });
};

const getAll = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 9;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
};

const getOne = async (req, res) => {
  try {
    console.log("Requested ID:", req.params.id);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { message: "هذه الوحدة غير موجودة" },
      });
    }

    return res.json({
      status: httpStatusText.SUCCESS,
      data: { user },
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
  const userId = req.params.id;
  let updatedUser;
  try {
    updatedUser = await User.updateOne(
      { _id: userId },
      { $set: { ...req.body } }
    );

    if (!updatedUser) {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { user: "هذه الوحدة غير موجودة" },
      });
    }

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { updatedUser },
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const deleteOne = async (req, res) => {
  const userId = req.params.id;
  let deletedUser;
  try {
    deletedUser = await User.deleteOne({ _id: userId });
    if (deletedUser.deletedCount === 1) {
      const users = await User.find({}, { __v: false });
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { users },
      });
    } else {
      res.status(404).json({
        status: httpStatusText.FAIL,
        data: { user: "هناك خطأ، لم يتم الحذف" },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "لم يتم الحذف",
    });
  }
};
const logIn = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { user: "email and password are required" },
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { user: "user not found" },
    });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    // logged in successfully
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { token },
    });
  } else {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { user: "email or password is incorrect" },
    });
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  logIn,
};
