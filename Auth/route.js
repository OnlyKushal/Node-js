const express = require("express");
const router = express.Router();

const validationSchema = require("../Controller/user");
const { register, login, update, new1 } = require("./auth");
const { userAuth } = require("../Middleware/authentication");

router.route("/register").post(register);
router.route("/login").post(validationSchema.validate("login-check"), login);
router.route("/update").get(update);
router.route("/new").get(new1);

module.exports = router;
