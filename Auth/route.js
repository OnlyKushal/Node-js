const express = require("express");
const validationSchema = require('../Controller/user');
const router = express.Router();
const { register, login } = require("./auth");
router.route("/register").post(register);
router.route("/login").post(validationSchema.validate('login-check'),login);
module.exports = router;