const express=require("express");
const router=express.Router({mergeParams:true});
const {getAccessToRoute}=require("../Middlewares/Authorization/Auth");
const {addNewAnswerToQuestion,gettAllAnswerByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undolikeAnswer}=require("../Controllers/Answer");
const {checkQuestionAndExit}=require("../Middlewares/Database/DatabaseErrorsHelpers");
const {getAnswerOwnerAccess}=require("../Middlewares/Authorization/Auth");
const answerQueryMiddleweare=require("../Middlewares/Query/answerQueryMiddleweare");
const Question = require("../Models/Question");
router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",gettAllAnswerByQuestion);
router.get("/:answer_id",checkQuestionAndExit,answerQueryMiddleweare(Question),getSingleAnswer);
router.get("/:answer_id/like",[checkQuestionAndExit,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undolike",[checkQuestionAndExit,getAccessToRoute],undolikeAnswer);

router.put("/:answer_id/edit",[checkQuestionAndExit,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndExit,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);




module.exports=router;