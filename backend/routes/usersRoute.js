const express=require("express");
const { createProductReview } = require("../controllers/productsController");
const { Register, loginUser, logouUser, resetPassword, resetPassPage, getUserDetails, passwordUpdate,updateUserProfile,getUsers,getSingleUsers, updateUserRole, deleteUser } = require("../controllers/usersController");
const { isAuthenticated, authRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/logout").get(logouUser);
router.route("/password/forgot").post(resetPassword);
router.route("/password/reset/:token").put(resetPassPage);
router.route("/me").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated,passwordUpdate);
router.route("/me/update").put(isAuthenticated,updateUserProfile);
router.route("/admin/users").get(isAuthenticated,authRoles("admin"),getUsers);
router.route("/review").put(isAuthenticated,createProductReview);

router.route("/admin/user/:id").get(isAuthenticated,authRoles("admin"),getSingleUsers).put(isAuthenticated,authRoles("admin"),updateUserRole).delete(isAuthenticated,authRoles("admin"),deleteUser)







module.exports=router;