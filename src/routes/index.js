const express = require("express");
const router = express.Router();
const auth = require("./auth");
const profile = require("./profile");
const request = require("./request");
const requestReceived  = require("./user");

router.use("/",auth,profile,request,requestReceived);

module.exports = router;