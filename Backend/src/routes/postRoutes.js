const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getPosts).post(protect, createPost);

module.exports = router;
