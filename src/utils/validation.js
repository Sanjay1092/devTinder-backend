const validate = require("validator");

function signupValidation(req) {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    skills,
    bio,
    photoUrl,
  } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid name");
  } else if (!validate.isEmail(emailId)) {
    throw new Error("Enter a valid emailId");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (age < 18 || age > 99) {
    throw new Error("Age must be between 18 to 99");
  } else if (!gender) {
    throw new Error("Gender is required");
  } else if (!skills || skills.length === 0) {
    throw new Error("Atleast one skill is required");
  } else if (typeof bio !== "string") {
    throw new Error("Enter a valid bio");
  } else if (!validate.isURL(photoUrl)) {
    throw new Error("Enter a valid photo URL");
  }
}

module.exports = { signupValidation };
