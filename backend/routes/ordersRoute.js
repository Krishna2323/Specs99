const express=require("express");
const { CreateOrders, getSingleOrder, myOrders, updateOrder, deleteOrder, getAllOrders } = require("../controllers/orderController");
const router=express.Router();

const { isAuthenticated, authRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticated,CreateOrders);
router.route("/order/:id").get(isAuthenticated,getSingleOrder);
router.route("/orders/me").get(isAuthenticated,myOrders);



// Admin Routes
router.route("/admin/orders").get(isAuthenticated,authRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authRoles("admin"),updateOrder).delete(isAuthenticated,authRoles("admin"),deleteOrder);


















module.exports=router;