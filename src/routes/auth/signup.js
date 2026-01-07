const express = require("express");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../../utils/validation");
const User = require("../../models/user");

const router = express.Router();


router.post("/signup", async (req, res) => {
  const {
    firstName,
    emailId,
    password,
  } = req.body;
  try {
    // validate input data
    signupValidation(req);
    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    // create a new instance of user model
    const user = new User({
      firstName,
      emailId,
      password: encryptPassword,
    });
    await user.save();
    const token = user.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 15*60*1000) });
    res.status(201).send("user data saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports=router;