const express = require("express");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../../utils/validation");
const User = require("../../models/user");

const router = express.Router();


router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    skills,
    bio,
    photoUrl,
  } = req.body;
  try {
    // validate input data
    signupValidation(req);
    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    // create a new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptPassword,
      age,
      gender,
      skills,
      bio,
      photoUrl,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports=router;