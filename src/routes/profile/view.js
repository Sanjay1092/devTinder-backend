const express = require("express");
const router = express.Router();
const { userAuth } = require("../../middlewares/userAuth")
const User = require("../../models/user");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const selectedUserData = await User.findById(user._id).select("firstName lastName age gender bio photoUrl");
    res.send(selectedUserData);
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});

module.exports = router;