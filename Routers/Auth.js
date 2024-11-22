const express=require("express");
const router=express.Router();
const {getAllRegister,getUser,login,logout,imageUpload,forgotpassword,resetpassword,editDetails}=require("../Controllers/Auth");
const {getAccessToRoute}=require("../Middlewares/Authorization/Auth");
const ProfileImageUpload=require("../Middlewares/Libraries/ProfileImageUpload");
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout",getAccessToRoute,logout);
router.post("/register",getAllRegister);
router.post("/login",login);
router.post("/forgotpassword",forgotpassword);
router.post("/upload",[getAccessToRoute,ProfileImageUpload.single("profile_image")],imageUpload);
router.put("/resetpassword",resetpassword);
router.put("/edit",getAccessToRoute,editDetails);




module.exports=router;