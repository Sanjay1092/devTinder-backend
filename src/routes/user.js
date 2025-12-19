const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const router = express.Router();
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.get("/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await connectionRequest
      .find({ toUserId: loggedInUser._id, status: "interested" })
      .populate("fromUserId", "firstName lastName");
    res.status(200).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.status(200).json({
      message: "Connections fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});

router.get("/feed", userAuth, async (req, res) => {
  /* 
    feed all users except 
    logged user
    status accepted / rejected / ignored / intersted
    */
  const loggedInUser = req.user;
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;
  try {
    // find all connection requests of logged in user (both sent and received)
    const connections = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connections.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });
    const users = await User.find({
        $and:[{ _id: { $ne: loggedInUser._id } },{ _id: { $nin: Array.from(hideUsersFromFeed) } }]
    }).select("firstName lastName").skip(skip).limit(limit);
    // skip(0).limit(10)
    // skip(10).limit(10)
    res.status(200).json({ users});
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});
module.exports = router;
