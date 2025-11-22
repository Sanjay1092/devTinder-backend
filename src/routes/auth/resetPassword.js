const express = require("express")
const validate = require("validator")
const bcrypt = require("bcrypt")
const user = require("../../models/user")
const router = express.Router()

router.post("/resetpassword",async(req,res)=>{
const {emailId,newPassword} = req.body
if(!validate.isEmail(emailId)){
    throw new Error("Enter a valid emailId");
}else if(!validate.isStrongPassword(newPassword)){
    throw new Error("Password is not strong")
}
const encryptPassword = await bcrypt.hash(newPassword,10)
try {
    await user.findOneAndUpdate({emailId:emailId},{password:encryptPassword})
    res.send("password updated successfully")
} catch (error) {
    res.status(400).send(`Error:${error.message}`);
}
})

module.exports = router


// if they enter old password in reset password make it invalid