const express = require("express");
const User = require("../../models/user");
const { ALLOWED_UPDATES } = require("./utils");

const router = express.Router();

router.patch("/profile/edit", async (req, res) => {
  const data = req.body;
  try {
    const loggdInUser = req.user;
    Object.keys(data).forEach((fields) => {
      if (ALLOWED_UPDATES.includes(fields)) {
        loggdInUser[fields] = data[fields];
      } else {
        throw new Error(`Invalid update field`);
      }
    });
    
    await loggdInUser.save();
    const selectedUserData = await User.findById(loggdInUser._id).select("firstName lastName age gender bio photoUrl");
    res.send(selectedUserData);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
