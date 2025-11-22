const express = require("express");
const router = express.Router();


router.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())}).send("Logout successful !!");
})


module.exports = router;