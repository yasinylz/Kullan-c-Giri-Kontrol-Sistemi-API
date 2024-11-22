const Question = require("../Models/Question");
const CustomError = require("../Helpers/Error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

// Get All Questions
const getAllQuestion = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200).json(res.queryResult);
});

// Get Single Question by ID
const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  
    return res.status(200).json(res.queryResult);
});

// Ask New Question
const askNewQuestions = asyncErrorWrapper(async (req, res, next) => {
    const information = req.body;
    const question = await Question.create({
        ...information,
        user: req.user.id
    });
    res.status(200).json({
        success: true,
        data: question
    });
});

// Edit Question
const editQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    let question = await Question.findById(id);
    question.title = title;
    question.content = content;
    question = await question.save();
    return res.status(200).json({
        success: true,
        data: question
    });
});

// Delete Question
const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({
        success: 200,
        message: "Soru Başarıyla Silindi!"
    });
});

// Like Question
const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    // Liked
    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("Bu soruyu zaten beğenmiştiniz", 400));
    }
    question.likes.push(req.user.id);
    question.likeCount = question.likes.length;
    await question.save();
    return res.status(200).json({
        success: true,
        data: question
    });
});

// Unlike Question
const UnlikeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    // Check if the question is already liked by the user
    if (!question.likes.includes(req.user.id)) {
        return next(new CustomError("Bu soruyu beğenmemişsiniz!", 400));
    }
    // Find the index of the user ID in the likes array
    const index = question.likes.indexOf(req.user.id);
    // Remove the user ID from the likes array
    question.likes.splice(index, 1);
    question.likeCount = question.likes.length;
    // Save the updated question
    await question.save();
    return res.status(200).json({
        success: true,
        data: question
    });
});

module.exports = {
    getAllQuestion,
    askNewQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    UnlikeQuestion
};
