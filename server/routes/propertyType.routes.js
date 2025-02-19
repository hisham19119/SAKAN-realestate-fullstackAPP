const express = require("express");
const router = express.Router();
const propertyTypeController = require("../controller/propertyType.controller");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");
const AllwoedTo = require("../middlewares/allwoedTo");
const typeValidators = require("../middlewares/validators/type.validator");

router
  .route("/")
  .post(
    verifyToken,
    AllwoedTo(userRoles.ADMIN),
    // typeValidators.createTypeValidator,
    propertyTypeController.createOne
  )
  .get(
    verifyToken,
    AllwoedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    propertyTypeController.getAll
  );

router
  .route("/:id")
  .get(
    verifyToken,
    AllwoedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    propertyTypeController.getOne
  )
  .patch(
    verifyToken,
    AllwoedTo(userRoles.ADMIN),
    // typeValidators.updateTypeValidator,
    propertyTypeController.updateOne
  )
  .delete(
    verifyToken,
    AllwoedTo(userRoles.ADMIN),
    propertyTypeController.deleteOne
  );

module.exports = router;
