// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { loginUser, renderHome,logoutUser, renderLogin,sessionCheck } = require("../controllers/userController");

router.post("/", loginUser);

router.get('/session', sessionCheck);

router.get("/:emp_id/home", renderHome);

router.get("/:emp_id/home/logout", logoutUser);

router.get('/',renderLogin);

module.exports = router;
