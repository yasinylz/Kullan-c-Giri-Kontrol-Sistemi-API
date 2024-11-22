const asyncErrorWrapper = require("express-async-handler");
const { SearchHelper, paginationHelper } = require("./QueryMiddleweareHelpers");

const userQueryMiddleware = function (model, options) {
    return asyncErrorWrapper(async function (req, res, next) {
        let query = model.find();

        // Search by name
        query = SearchHelper("name", query, req); // Doğru şekilde `req` geçiriliyor

        const total = await model.countDocuments();
        const paginationResult = await paginationHelper(total, query, req); // `total` ve `query` doğru şekilde geçiriliyor
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

module.exports = userQueryMiddleware;
