const express = require("express");
const { ALLOWED_UPDATES } = require("./utils");

const router = express.Router();

router.patch("/profile/edit", async (req, res) => {
  const data = req.body;
  try {
    const user = req.user;
    Object.keys(data).every((fields) => {
      if (ALLOWED_UPDATES.includes(fields)) {
        user[fields] = data[fields];
      } else {
        throw new Error(`Invalid update field`);
      }
    });
    await user.save();
    res.send("User profile updated successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
