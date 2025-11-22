const express = require("express");
const router = express.Router();
const { userAuth } = require("../../middlewares/userAuth")

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});

module.exports = router;