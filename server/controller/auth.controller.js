// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const generateJWT = require("../utils/generate.JWT");
// const httpStatusText = require("../utils/httpStatusText");

// const register = async (req, res) => {
//   const { name, password, email, role } = req.body;
//   const oldUser = await User.findOne({ email: email });
//   if (oldUser) {
//     return res
//       .status(400)
//       .json({ message: "user with this email already exists" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({
//     name,
//     password: hashedPassword,
//     email,
//     role,
//   });
//   await newUser.save();
//   const token = await generateJWT({
//     email: newUser.email,
//     id: newUser._id,
//     role: newUser.role,
//   });
//   newUser.token = token;
//   return res
//     .status(200)
//     .json({ status: httpStatusText.SUCCESS, data: { newUser } });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(404).json({
//       status: httpStatusText.FAIL,
//       data: { user: "email and password are required" },
//     });
//   }
//   const user = await User.findOne({ email, email });
//   if (!user) {
//     return res
//       .status(400)
//       .json({ status: httpStatusText.FAIL, data: { user: "user not found" } });
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (isMatch) {
//     const token = await generateJWT({
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     });
//     return res.status(200).json({
//       status: httpStatusText.SUCCESS,
//       data: { token },
//     });
//   } else {
//     return res.status(404).json({
//       status: httpStatusText.FAIL,
//       data: { message: "password or email is not correct" },
//     });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     const userId = req.currentUser.id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         status: httpStatusText.ERROR,
//         error: "User not found",
//       });
//     }
//     await User.updateOne({ _id: userId }, { $set: { token: null } });
//     await user.save();
//     res.status(200).json({
//       status: httpStatusText.SUCCESS,
//       data: { message: "Logged out successfully" },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Failed to log out" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   logout,
// };

// authController.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, password, email, role } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, password: hashedPassword, email, role });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.json({ message: "Login successful" });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
