const express=require("express");

const { createBanner, getAllBanners, deleteBanner } = require("../controllers/bannerController");
const { isAuthenticated, authRoles } = require("../middleware/auth");
const router=express.Router();


router.route("/admin/banner/new").post(isAuthenticated,authRoles("admin"),createBanner);
router.route("/banners").get(getAllBanners);
router.route("/admin/banner/:id").delete(isAuthenticated,authRoles("admin"),deleteBanner);



module.exports=router;