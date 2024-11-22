const mongoose=require("mongoose");

const DatabaseConnect=()=>{
    mongoose.connect(process.env.Server_URLI)
    .then(console.log("Database is Successfull.."))
    .catch(err=>console.log(err));
}

module.exports=DatabaseConnect;