const { body } = require("express-validator");
const validationMiddleware = require("../validation.middleware");

const User = require("../../models/user.model");

const createUserValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("please enter your name")
      .isLength({ min: 2 })
      .withMessage("name is too short")
      .isLength({ max: 30 })
      .withMessage("name is too long"),

    body("email")
      .notEmpty()
      .withMessage("please enter your email address")
      .isEmail()
      .withMessage("please enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("please enter your password")
      .isLength({ min: 6 })
      .withMessage("password must at least 6 characters ")
      .isLength({ max: 30 })
      .withMessage("passsword is too long"),
    ,
    validationMiddleware,
  ];
};
const updateUserValidator = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("name is too short")
      .isLength({ max: 30 })
      .withMessage("name is too long"),

    body("email")
      .optional()
      .isEmail()
      .withMessage("please enter a valid email address"),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("password must at least 6 characters ")
      .isLength({ max: 30 })
      .withMessage("passsword is too long"),
    ,
    validationMiddleware,
  ];
};

module.exports = {
  createUserValidator,
  updateUserValidator,
};
