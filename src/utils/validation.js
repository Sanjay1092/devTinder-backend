const validate = require("validator");

function signupValidation(req) {
  const {
    firstName,
    emailId,
    password,
  } = req.body;
  if (!firstName) {
    throw new Error("Enter a valid name");
  } else if (!validate.isEmail(emailId)) {
    throw new Error("Enter a valid emailId");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } 
}

module.exports = { signupValidation };
