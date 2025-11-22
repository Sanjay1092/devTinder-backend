const express = require("express")
const signup = require("./signup");
const login = require("./login")
const logout = require("./logout")
const resetPassword = require("./resetPassword")

const router = express.Router();

router.use("/",signup,login,logout,resetPassword )

module.exports = router;

