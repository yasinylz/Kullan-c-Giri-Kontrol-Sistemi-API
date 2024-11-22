const User=require("../Models/User");
const CustomError=require("../Helpers/Error/CustomError");
const asyncErrorWrapper=require("express-async-handler");
const blocker=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    user.blocked=!user.blocked;

    await user.save();
    return res.status(200).json({
        success:true,
        message:"Block -Unblock Successfull"
    });

});
const deleteUser = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        message: "Delete Operation Successful"
    });
});
module.exports={
    blocker,
    deleteUser
}