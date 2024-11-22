const  express=require("express");
const routers=express.Router();
const auth=require("./Auth");
const questions=require("./Questions");
const user=require("./User");
const admin = require("./Admin");


routers.use("/auth",auth);
routers.use("/questions",questions);
routers.use("/users",user);
routers.use("/admins",admin);


module.exports=routers;