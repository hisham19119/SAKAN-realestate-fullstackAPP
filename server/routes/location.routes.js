const express = require("express");
const router = express.Router();
const locationController = require("../controller/location.controller");
const AllowedTo = require("../middlewares/allwoedTo");
const verifyToken = require("../middlewares/verifyToken");
const locationValidators = require("../middlewares/validators/location.validator");
const userRoles = require("../utils/userRoles");
router
  .route("/")
  .post(
    verifyToken,
    AllowedTo(userRoles.ADMIN),
    // locationValidators.createLocationValidator,
    locationController.createOne
  )
  .get(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    locationController.getAll
  );

router
  .route("/:id")
  .get(
    verifyToken,
    AllowedTo(userRoles.ADMIN, userRoles.EMPLOYEE, userRoles.USER),
    locationController.getOne
  )
  .patch(
    verifyToken,
    AllowedTo(userRoles.ADMIN),
    // locationValidators.updateLocationValidator,
    locationController.updateOne
  )
  .delete(
    verifyToken,
    AllowedTo(userRoles.ADMIN),
    locationController.deleteOne
  );

module.exports = router;
