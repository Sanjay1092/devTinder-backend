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
      res.cookie("token", token, { expires: new Date(Date.now() + 300000) });
      res.send("Login successful 🥳🥳");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});
module.exports = router