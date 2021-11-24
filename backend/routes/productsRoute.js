const express=require("express");

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productsController");
const { isAuthenticated, authRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticated,authRoles("admin"),createProduct)
router.route("/admin/product/:id").put(isAuthenticated,authRoles("admin"),updateProduct).delete(isAuthenticated,authRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/reviews").get(isAuthenticated,getProductReviews)

router.route("/reviews").get(isAuthenticated,getProductReviews).delete(isAuthenticated,deleteReview);



// Admin Routes

router.route("/admin/products").get(isAuthenticated,authRoles("admin"),getAdminProducts);





module.exports=router;