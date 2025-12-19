const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const user = require("../models/user")
const connectionRequest = require("../models/connectionRequest");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  if (!["interested", "ignored"].includes(status)) {
    return res.status(400).json({ message: `Invalid status: ${status}` });
  }
  try {
    const toUser = await user.findById(toUserId)
    if(!toUser){
        return res.status(404).json({message:"Id not found"})
    }
    //check whether connection request already exists
    const isRequestExists = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isRequestExists) {
      return res.json({
        message: "Request already exists",
      });
    }
    const request = new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await request.save();
    res.json({
      message: "connection request sent successfully",
      data,
    });
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
});


router.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  const loggedUserId = req.user.id
  const {status,requestId} = req.params;
  const allowedStatus = ["accepted","rejected"];
  
  try {
    if(!allowedStatus.includes(status)){
    return res.status(400).json({message:`Invalid status :${status}`})
  }
  
  const connection = await connectionRequest.findOne({
    _id:requestId,
    toUserId:loggedUserId,
    status : "interested"
  });
  
  if(!connection){
    return res.status(404).json({message:"Request not found"})
  }else{
    connection.status = status;
    const data = await connection.save();
    return res.json({message:`Request ${status} successfully`,data})
  }
  } catch (error) {
    res.status(400).send(`Error:${error.message}`);
  }
})
module.exports = router;
