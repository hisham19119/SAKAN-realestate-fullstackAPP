const express = require("express");
const router = express.Router();
const propertyController = require("../controller/property.controller");
const AllowedTo = require("../middlewares/allwoedTo");
const verifyToken = require("../middlewares/verifyToken");
const propertiesValidators = require("../middlewares/validators/propertyValidator");
const userRoles = require("../utils/userRoles");
const upload = require("../middlewares/upload");
// const uploadToCloudinary = require("../middlewares/upload/uploadToCloudinary");

router
  .route("/")
  .post(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE),
    // propertiesValidators.createPropertyValidator(),
    upload.upload.fields([{ name: "image" }, { name: "images" }]),
    upload.uploadToCloudinary,
    propertyController.createOne
  )
  .get(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    propertyController.getAll
  );

router
  .route("/:id")
  .get(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    propertyController.getOne
  )
  .patch(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE),
    // propertiesValidators.updatePropertyValidator(),
    propertyController.updateOne
  )
  .delete(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE),
    propertyController.deleteOne
  );

module.exports = router;
