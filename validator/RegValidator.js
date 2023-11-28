const { body } = require("express-validator");

const validator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("User Name should not be that long."),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/)
    .withMessage("Password must contain Numbers, Letter Case, and Symbols."),
];

module.exports = validator;
