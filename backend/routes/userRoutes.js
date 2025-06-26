// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser,renderHome } = require('../controllers/userController');

router.post('/', loginUser);

router.get('/:emp_id/home', renderHome);

// router.get('/:emp_id/home/:feature', userController.renderFeature);

// router.put("/:emp_id/home/settings/changepassword", userController.updatePassword);

// router.put("/:emp_id/home/settings/updateprofile", userController.updateProfile);

router.put("/:emp_id/home/settings/changepassword", userController.updatePassword);

router.put("/:emp_id/home/settings/updateprofile", userController.updateProfile);

module.exports = router;
