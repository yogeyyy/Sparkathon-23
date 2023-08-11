const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
  userdp: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer",
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
