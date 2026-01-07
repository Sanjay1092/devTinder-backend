const express = require("express")
const validate = require("validator");
const User = require("../../models/user");
const router = express.Router();


router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validate.isEmail(emailId)) {
      throw new Error("Invalid email format");
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await user.isValidPassword(password);

    if (isValidPassword) {
      const token = user.getJWT();
      const selectedUserData = await User.findById(user._id).select("firstName lastName age gender bio photoUrl")
      res.cookie("token", token, { expires: new Date(Date.now() + 15*60*1000) });
      res.send(selectedUserData);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});
module.exports = router