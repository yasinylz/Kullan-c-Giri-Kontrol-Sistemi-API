const express=require("express");
const {getAccessToRoute,getAdminAccess}=require("../Middlewares/Authorization/Auth");
const {blocker,deleteUser}=require("../Controllers/Admin");
const {checkUserExit}=require("../Middlewares/Database/DatabaseErrorsHelpers");
const router=express.Router();

router.use([getAccessToRoute,getAdminAccess]);

//Block User
router.get("/block/:id",checkUserExit,blocker);
router.delete("/delete/:id",checkUserExit,deleteUser);

module.exports=router;