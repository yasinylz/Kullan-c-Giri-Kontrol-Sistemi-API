const asyncErrorWrapper = require("express-async-handler");
const { populateHelper,  paginationHelper } = require("./QueryMiddleweareHelpers");
const { query } = require("express");
const answerQueryMiddleweare = function (model, options) {
    return asyncErrorWrapper(async function (req, res, next) {
     const {id}=req.params;
     const arryName="answers";
     const total=(await model.findById(id))["answerCount"]
const paginationResult=await paginationHelper(total,undefined,req);
const startIndex=paginationResult.startIndex;
const limit=paginationResult.limit;
let queryObject={}  ;
queryObject[arryName]={$slice:[startIndex,limit]};
let  query=model.find({_id:id},queryObject);
 query =populateHelper(query,options.population);

const queryResult=await query;
res.queryResult={
    success:true,
    pagination:paginationHelper.pagination,
    data:queryResult
}
next(); 
    });
};

module.exports = answerQueryMiddleweare;