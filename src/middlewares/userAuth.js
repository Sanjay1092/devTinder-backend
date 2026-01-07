const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) => {
  try {
    // read cookies from req
    const { token } = req.cookies;
    if(!token){
      return res.status(401).send("Unauthorized: No token provided");
    }
    //validate the cookies
    const decodedObj = jwt.verify(token, "dev@Tinder1010");
    //get the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    req.user =user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
module.exports = { userAuth };
