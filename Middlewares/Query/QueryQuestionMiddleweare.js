const asyncErrorWrapper = require("express-async-handler");
const { SearchHelper, populateHelper, questionSortHelper, paginationHelper } = require("./QueryMiddleweareHelpers");

const questionQueryMiddleweare = function (model, options) {
    return asyncErrorWrapper(async function (req, res, next) {
        // Initial Query
        let query = model.find();

        // Search
        
        query = SearchHelper("title", query, req);

        // Populate
        if (options && options.population) {
            query = populateHelper(query, options.population);
        }

        // Sort
        query = questionSortHelper(query, req);

        // Pagination
        const total=await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        const queryResult = await query;

        res.queryResult = {
            success: true,
            count: queryResult.length,
            pagination: pagination,
            data: queryResult
        };

        next();
    });
};

module.exports = questionQueryMiddleweare;
