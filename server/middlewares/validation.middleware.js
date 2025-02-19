const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validationMiddleware;
