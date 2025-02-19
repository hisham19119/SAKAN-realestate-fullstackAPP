const { body } = require("express-validator");
const validationMiddleware = require("../validation.middleware");

const createLocationValidator = () => {
  return [
    body("location")
      .notEmpty()
      .withMessage("please enter your location")
      .isLength({ min: 2 })
      .withMessage("location is too short")
      .isLength({ max: 30 })
      .withMessage("location is too long"),
    ,
    validationMiddleware,
  ];
};
const updateLocationValidator = () => {
  return [
    body("location")
      .optional()
      .isLength({ min: 2 })
      .withMessage("location is too short")
      .isLength({ max: 30 })
      .withMessage("location is too long"),

    validationMiddleware,
  ];
};

module.exports = {
  createLocationValidator,
  updateLocationValidator,
};
