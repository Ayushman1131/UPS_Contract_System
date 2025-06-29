// routes/userRoutes.js
const path = require("path");
const express = require("express");
const router = express.Router();
const { loginUser, renderHome,logoutUser } = require("../controllers/userController");

router.post("/", loginUser);

router.get("/:emp_id/home", renderHome);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

router.get("/:emp_id/home/logout", logoutUser);

// router.get('/:emp_id/home/:feature', renderFeature);

// router.put("/:emp_id/home/settings/changepassword", userController.updatePassword);

// router.put("/:emp_id/home/settings/updateprofile", userController.updateProfile);

// router.put("/:emp_id/home/settings/changepassword", userController.updatePassword);

// router.put("/:emp_id/home/settings/updateprofile", userController.updateProfile);

module.exports = router;
