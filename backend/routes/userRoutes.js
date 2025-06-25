// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');

router.post('/', loginUser);

router.get('/:emp_id/home', userController.renderHome);

router.get('/:emp_id/home/:feature', userController.renderFeature);

router.put("/:emp_id/home/settings/changepassword", userController.updatePassword);

router.put("/:emp_id/home/settings/updateprofile", userController.updateProfile);

module.exports = router;
