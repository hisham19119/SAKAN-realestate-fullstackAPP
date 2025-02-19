const { body } = require("express-validator");
const validationMiddleware = require("../validation.middleware");

const createTypeValidator = () => {
  return [
    body("type")
      .notEmpty()
      .withMessage("please enter your type")
      .isLength({ min: 2 })
      .withMessage("type is too short")
      .isLength({ max: 30 })
      .withMessage("type is too long"),
    ,
    validationMiddleware,
  ];
};
const updateTypeValidator = () => {
  return [
    body("type")
      .optional()
      .isLength({ min: 2 })
      .withMessage("type is too short")
      .isLength({ max: 30 })
      .withMessage("type is too long"),

    validationMiddleware,
  ];
};

module.exports = {
  createTypeValidator,
  updateTypeValidator,
};
