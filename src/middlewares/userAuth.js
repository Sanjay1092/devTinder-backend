const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {
    // read cookies from req
    const { token } = req.cookies;
    if(!token){
      throw new Error("Invalid token");
    }
    //validate the cookies
    const decodedObj = jwt.verify(token, "dev@Tinder1010");
    //get the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid user");
    }
    req.user =user;
    next();
  } catch (error) {
    res.send(`Error:${error.message}`);
  }
};
module.exports = { userAuth };
