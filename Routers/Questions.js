const express=require("express");
const router=express.Router();
const Question=require("../Models/Question");
const answer=require("./Answer");
const {getAllQuestion,getSingleQuestion,askNewQuestions,editQuestion,deleteQuestion,likeQuestion,UnlikeQuestion}=require("../Controllers/Questions");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../Middlewares/Authorization/Auth");
const {checkQuestionExit}=require("../Middlewares/Database/DatabaseErrorsHelpers");
const questionQueryMiddleweare=require("../Middlewares/Query/QueryQuestionMiddleweare");
router.get("/",questionQueryMiddleweare(
    Question,{
        population:[{
            path:"user",
            select:"name profile_image"
        },{
            path:"answers"
            ,select:"content"
        }]
    }
),getAllQuestion);
router.get("/:id/like",[getAccessToRoute,checkQuestionExit],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExit],UnlikeQuestion);

router.get("/:id",checkQuestionExit,getSingleQuestion);
router.post("/ask",getAccessToRoute,askNewQuestions);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExit,getQuestionOwnerAccess],editQuestion)
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExit,getQuestionOwnerAccess],deleteQuestion)
router.use("/:question_id/answer",checkQuestionExit,answer);


module.exports=router;