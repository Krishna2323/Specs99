const User = require("../modals/userModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr = require("../middleware/catchAsyncErr");
const JWTtoken = require("../utils/jwtToken");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.Register = catchAsyncErr(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });

  sendToken(user, 200, res);
});

exports.loginUser = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email And Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password"), 401);
  }

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Invalid Email Or Password"), 401);
  }

  sendToken(user, 200, res);
});

exports.logouUser = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged Out Successfully" });
});

exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No User Found With This Email", 500));
  }

  const resetToken = user.resetPassword();

  await user.save({ validationBeforeSave: false });

  const resetPassUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const resetPassMessage = `Your Reset Password Link Is \n\n ${resetPassUrl} \n\n If You Have Not Requested It Then Ignore. `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Specs 99 User Password Reset",
      message: resetPassMessage,
    });

    res.status(200).json({
      success: true,
      message: "Password Reset Link Sent To Your Email Successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validationBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassPage = catchAsyncErr(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Paasword Token Is Invalid Or Has Been Expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.passwordUpdate = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password Is Incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does Not Match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateUserProfile = catchAsyncErr(async (req, res, next) => {
  const newUserData = { name: req.body.name, email: req.body.email };


 
if (req.body.avatar !== "") {
  const user = await User.findById(req.user.id);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  newUserData.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
}

    


  
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

exports.getUsers = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUsers = catchAsyncErr(async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(new ErrorHandler("User Does Not Exist", 500));
  }

  res.status(200).json({
    success: true,
    users,
  });
});

exports.updateUserRole = catchAsyncErr(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User Does Not Exist", 500));
  }

  await user.save();
  res.status(200).json({
    success: true,
    message: "User Role Updated Successfully",
  });
});

exports.deleteUser = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Does Not Exist", 500));
  }

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
