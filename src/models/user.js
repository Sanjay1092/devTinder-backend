const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxLength: 30,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      return validator.isEmail(value);
    },
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong enough");
      }
      return true;
    },
  },
  age: {
    type: Number,
    min: 18,
    max: 99,
    trim: true,
  },
  gender: {
    type: String,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender must be Male,female & others");
      }
    },
  },
  skills: {
    type: [String],
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  photoUrl: {
    type: String,
    trim: true,
    validate(value) {
      return validator.isURL(value);
    },
  },
});

userSchema.methods.getJWT = function () {
  const token = jwt.sign({ _id: this._id }, "dev@Tinder1010", {
    expiresIn: "5m",
  });
  return token;
};

userSchema.methods.isValidPassword = async function (password) {
  const isValid = bcrypt.compare(password, this.password);
  return isValid;
};

const User = mongoose.model("User", userSchema); // model name always starts with capital letter

module.exports = User;
