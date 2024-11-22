const dotenv = require('dotenv').config({path:"./config/config.env"});
const express=require("express");
const app= express();
const path=require("path");
const routers=require("./Routers/Index");
const DatabaseConnect=require("./Helpers/Database/Database");
const CustomErrorHandler=require("./Middlewares/Errors/CustomErrorHandler");
app.use(express.json())
const Port=process.env.PORT
//Connect Database
DatabaseConnect();
app.use("/api",routers);
//Error Handler
app.use(CustomErrorHandler);
//Static Files
app.use(express.static(path.join(__dirname,"Public")));
app.listen(Port,()=>{
    console.log(`${Port},listening..`)
});