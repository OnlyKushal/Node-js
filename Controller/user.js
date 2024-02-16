const { validationResult, check } = require("express-validator");

exports.validate = (methode) => {
  switch (methode) {
    case "login-check":
      return [
        check("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Please enter a valid email address"),
        check("password")
          .notEmpty()
          .withMessage("Password is required")
          .isStrongPassword()
          .withMessage("Please enter a strong password")
          .isLength({ min: 8 })
          .withMessage("Must be at least 6 chars long"),
      ];
      break;

    default:
      break;
  }
};
