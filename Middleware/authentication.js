const express = require("express");
const app = express();
app.use(express.json());
const user = require("../Model/userModel");
const JWT = require("jsonwebtoken");
const crypt = require("bcryptjs");
require("dotenv").config();
const jwtsecrate = process.env.JWT_SECRATE;


exports.userAuth = (req, res, next) => {
    const token = req.cookies
  return res.status(200).json("Kushal");
    // if (!token) {
    //   return res.status(500).json({
    //     message: "Authentiaction failed",
    //     error: "Token is not available",
    //   });
    // } else {
    //   const tokenVerification = JWT.verify(
    //     token,
    //     jwtsecrate,
    //     (error, decodedToken) => {
    //       if (error) {
    //         return res.status(500).json({
    //           message: "Authentiaction failed",
    //           error: "Token is invaild",
    //         });
    //       } else {
    //         return res.status(500).json({
    //             message: "Authentiaction failed",
    //             error: decodedToken,
    //           });
    //         // next();
    //       }
    //     }
    //   );
    // }
  };
  