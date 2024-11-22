const express = require("express");
const User = require("../Models/User");
const { getSingleUser, gettAllUser } = require("../Controllers/User");
const { checkUserExit } = require("../Middlewares/Database/DatabaseErrorsHelpers");
const userQueryMiddleware = require("../Middlewares/Query/userQueryMiddleware");

const router = express.Router();

router.get("/", userQueryMiddleware(User), gettAllUser);
router.get("/:id", checkUserExit, getSingleUser);

module.exports = router;
