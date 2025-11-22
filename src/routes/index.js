const express = require("express");
const router = express.Router();
const auth = require("./auth");
const profile = require("./profile");
const request = require("./request");

router.use("/",auth,profile,request);

module.exports = router;