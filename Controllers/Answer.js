const Question=require("../Models/Question");
const Answer =require("../Models/Answer");
const CustomError=require("../Helpers/Error/CustomError");
const asyncErrorWrapper=require("express-async-handler");

const addNewAnswerToQuestion=asyncErrorWrapper(async(req,res,next)=>{
const {question_id}=req.params;
const user_id=req.user.id;
const information=req.body;
const answer=await Answer.create({
    ...information,
    question:question_id,
    user:user_id
});
return res.status(200).json({
    success:true,
    data:answer
});

});
const gettAllAnswerByQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { question_id } = req.params;
    const question = await Question.findById(question_id).populate('answers'); // 'answers' string olarak geçmeli
    if (!question) {
        return next(new CustomError('Question not found', 404));
    }
    const answers = question.answers;
    return res.status(200).json({
        success: true,
        count: answers.length,
        data: answers
    });
});

const getSingleAnswer= asyncErrorWrapper(async (req, res, next) => {
    const {answer_id}=req.params;
    const answer=await Answer.findById(answer_id).populate({
        path:"question",
        select:"title"
    }).populate({
        path:"user",
        select:"name profile_image"
    })
    return res.status(200).json({
        success:true,
        data:answer
    });

});
const editAnswer=asyncErrorWrapper(async (req, res, next) => {
const {answer_id}=req.params;
const {content}=req.body;
let answer=await Answer.findById(answer_id);
answer.content=content;
await answer.save();
return res.status(200).json({
    success:true,
    data:answer
});

});
const deleteAnswer=asyncErrorWrapper(async (req, res, next) => {
const {answer_id}=req.params;
const {question_id}=req.params;
await Answer.findByIdAndDelete(answer_id);
const question=await Question.findById(question_id);
question.answers.splice(question.answers.indexOf(answer_id),1);
question.answerCount=question.answers.length;
await question.save();
return res.status(200).json({
    success:true,
    message:"Silme İşlemi Başarıyla Gerçekleşti"
});


});
const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
    const { answer_id } = req.params;
    const answer = await Answer.findById(answer_id);

    // Check if already liked
    if (answer.likes.includes(req.user.id)) {
        return next(new CustomError("Bu cevabı zaten beğendiniz", 400));
    }
    answer.likes.push(req.user.id);
    await answer.save(); // Ensure this is saving the answer, not question
    return res.status(200).json({
        success: true,
        data: answer
    });
});

const undolikeAnswer=asyncErrorWrapper(async (req, res, next) => {
    const { answer_id } = req.params;
    const answer = await Answer.findById(answer_id);
    
    // Check if the question is already liked by the user
    if (!answer.likes.includes(req.user.id)) {
        return next(new CustomError("Bu soruyu beğenmemişsiniz!", 400));
    }

    // Find the index of the user ID in the likes array
    const index = answer.likes.indexOf(req.user.id);
    
    // Remove the user ID from the likes array
    answer.likes.splice(index, 1);
    
    // Save the updated question
    await answer.save();

    return res.status(200).json({
        success: true,
        data: answer
    });

});
module.exports={
    addNewAnswerToQuestion,gettAllAnswerByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undolikeAnswer
}