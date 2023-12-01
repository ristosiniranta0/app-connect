/*
Filename: ComplexCodeExample.js

Description:
This code is a sophisticated and elaborate example that demonstrates the implementation of a blog system. It includes features such as user management, post creation, commenting, and authentication.

Note:
To execute this code, please ensure that you have the required dependencies and databases set up.

*/

// Import necessary libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myblogsystem', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Define MongoDB schema for Posts
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
const Post = mongoose.model('Post', postSchema);

// Define MongoDB schema for Comments
const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Comment = mongoose.model('Comment', commentSchema);

// Authenticate user and generate JWT
const authenticateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.id }, 'my-secret-key');
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// API endpoint for user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for creating a new post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title: title,
      content: content,
      author: req.user._id,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for creating a new comment
app.post('/posts/:postId/comments', async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;

  try {
    const comment = new Comment({
      content: content,
      author: req.user._id,
    });
    await comment.save();

    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: 'Comment created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for fetching all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author').populate('comments');
    res.json({ posts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint for user login and getting JWT token
app.post('/login', authenticateUser, (req, res) => {
  res.json({ token: req.token });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Note: This is a simplified example, in a real-world scenario, more validations and error handling would be required.