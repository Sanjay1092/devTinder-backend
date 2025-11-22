const express = require("express");
const getProfile = require("./view")
const updateProfile = require("./edit")
const {userAuth} = require("../../middlewares/userAuth")
const router = express.Router();

router.use("/",userAuth,getProfile, updateProfile)
module.exports = router;