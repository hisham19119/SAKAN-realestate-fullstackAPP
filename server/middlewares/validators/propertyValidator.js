const { body } = require("express-validator");
const validationMiddleware = require("../validation.middleware");
const Location = require("../../models/location.model");
const Type = require("../../models/propertyType.model");
const createPropertyValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Property title is required")
      .isLength({ min: 3 })
      .withMessage("title must be at least 2 characters")
      .isLength({ max: 30 })
      .withMessage("title is too much "),
    body("description").notEmpty().withMessage("please fill the description"),
    body("price").notEmpty().withMessage("please fill the price"),
    body("location")
      .notEmpty()
      .custom((locationId) =>
        Location.findById(locationId).then((location) => {
          if (!location) {
            return Promise.reject(
              new Error(`No location for this id: ${locationId}`)
            );
          }
        })
      ),
    body("image").notEmpty().withMessage("please upload cover image"),
    body("images").notEmpty().withMessage("please upload images"),
    body("rooms").notEmpty().withMessage("please fill the the number of rooms"),
    body("bathrooms")
      .notEmpty()
      .withMessage("please fill the number of bathrooms"),
    body("area").notEmpty().withMessage("please fill the area"),
    body("garages")
      .notEmpty()
      .withMessage("please fill the number of grage spots"),
    body("type")
      .notEmpty()
      .custom((typeId) =>
        Type.findById(typeId).then((type) => {
          if (!type) {
            return Promise.reject(new Error(`No type for this id: ${typeId}`));
          }
        })
      ),
    validationMiddleware,
  ];
};

const updatePropertyValidator = () => {
  return [
    body("title")
      .optional()
      .isLength({ min: 3 })
      .withMessage("title must be at least 2 characters")
      .isLength({ max: 30 })
      .withMessage("title is too much "),
    body("description").optional(),
    body("price").optional(),
    body("location")
      .optional()
      .custom((locationId) =>
        Location.findById(locationId).then((location) => {
          if (!location) {
            return Promise.reject(
              new Error(`No location for this id: ${locationId}`)
            );
          }
        })
      ),
    body("image").optional(),
    body("images").optional(),
    body("rooms").optional(),
    body("bathrooms").optional(),
    body("area").optional(),
    body("garages").optional(),
    body("type")
      .optional()
      .custom((typeId) =>
        Type.findById(typeId).then((type) => {
          if (!type) {
            return Promise.reject(new Error(`No type for this id: ${typeId}`));
          }
        })
      ),
    validationMiddleware,
  ];
};

module.exports = {
  createPropertyValidator,
  updatePropertyValidator,
};
