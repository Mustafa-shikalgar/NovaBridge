const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// GET /api/users/me/courses — get logged in user's purchased courses
router.get('/me/courses', authMiddleware, userController.getMyCourses);

// GET /api/users/me — get current user profile
router.get('/me', authMiddleware, userController.getMe);

module.exports = router;
