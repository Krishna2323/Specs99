const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minlength: [4, "Name Should Have Atleast 4 Characters"],
    maxlength: [25, "Name Cannot Exceed More Than 25 Characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter A Valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [6, "Password Should Contain Atleast 6 Characters"],
    select: false,
  },

  avatar: {
    public_id: { type: String, required: true },

    url: { type: String, required: true },
  },

  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (epassword) {
  return await bcrypt.compare(epassword, this.password);
};

userSchema.methods.resetPassword = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const Usersc = mongoose.model("User", userSchema);
Usersc.createIndexes();
module.exports = Usersc;
