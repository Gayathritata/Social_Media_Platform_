const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    const { content, image } = req.body;

    const post = new Post({
        user: req.user._id,
        content,
        image
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private (or Public)
const getPosts = async (req, res) => {
    const posts = await Post.find({}).populate('user', 'username profilePicture').sort({ createdAt: -1 });
    res.json(posts);
};

module.exports = { createPost, getPosts };
