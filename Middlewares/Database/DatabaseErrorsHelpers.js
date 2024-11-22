const User=require("../../Models/User");
const CustomError=require("../../Helpers/Error/CustomError");
const Question=require("../../Models/Question");
const Answer =require("../../Models/Answer");

const asyncErrorWrapper=require("express-async-handler");
//Check User
const checkUserExit=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user){
        return next(new CustomError("Bu kimliğe sahip kullanıcı yok",400));
    }
    next();
});
const checkQuestionExit=asyncErrorWrapper(async(req,res,next)=>{
  const question_id=req.params.id || req.params.question_id
    const question=await Question.findById(question_id);
    if(!question){
        return next(new CustomError("Bu kimliğe sahip Soru yok",400));
    }
    next();
});
const checkQuestionAndExit=asyncErrorWrapper(async(req,res,next)=>{
    const question_id=req.params.question_id;
    const answer_id=req.params.answer_id;
    const answer=await Answer.findOne({
        _id:answer_id,
        question:question_id
    });
    if(!answer){
        return next(new CustomError("Soru kimliği ile ilişkilendirilmiş bir yanıt yok",400));
    }
    next();
});
module.exports={
    checkUserExit,checkQuestionExit,checkQuestionAndExit
}