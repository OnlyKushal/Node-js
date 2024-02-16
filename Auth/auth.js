const express = require("express");
const validator = require("express-validator");
const app = express();
app.use(express.json());
const user = require("../Model/userModel");
const JWT = require("jsonwebtoken");
const crypt = require("bcryptjs");
require("dotenv").config();
const jwtsecrate = process.env.JWT_SECRATE;
const cookiePerser = require('cookie--parser');

// app.use(express.json());
exports.register = async (req, res, next) => {
  const { email, name, password, address } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password Should be 6 Charector" });
  }
  crypt.hash(password, 10, async (error, hash) => {
    try {
      await user
        .create({
          name,
          password: hash,
          email,
          address,
        })
        .then((user) => {
          res.status(200).json({ message: "User created successfully", user });
        });
    } catch (error) {
      res.status(401).json({
        message: "User not successfully created",
        error: error.message,
      });
    }
  });
};

exports.login = async (req, res) => {
  const error = validator.validationResult(req);

  //Validator
  if (!error.isEmpty()) {
    res.status(401).json({
      message: "User not successfully created",
      error: error.array({ onlyFirstError: true }),
    });
    return;
  }

  const { email, password } = req.body;
  const response = await user.findOne({ email: email });

  if (response == null) {
    res
      .status(404)
      .json({
        message: "User not found",
        error: "please enter a valid email address",
      });
  } else {
    const validatePassword = crypt.compare(password, response.password);

    validatePassword
      .then((result) => {
        if (result) {
          const expiredAt = 3 * 60 * 60;

          const token = JWT.sign(
            {
              id: response._id,
              email,
              password,
            },
            jwtsecrate,
            {
              expiresIn: expiredAt,
            }
          );

          res.cookie("JWT", token, {
            httpOnly: true,
            maxAge: expiredAt * 1000,
          });

          res.status(200).json({
            message: "Login Successfully",
            user: {
              id: response._id,
              name: response.name,
            },
            token: token,
          });
        } else {
          res.status(200).json({
            message: "login not success",
            error: "Please enter a correct password",
          });
        }
      })
      .catch((error) => {
        res.status(404).json({
          message: "An error occurred",
          error: error.message,
        });
      });
  }
};
