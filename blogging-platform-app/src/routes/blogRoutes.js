const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");
const authenticateToken = require("../middleware/authenticateToken");

// Create a new blog post
router.post("/posts", authenticateToken, blogPostController.createPost);

// Get all blog posts
router.get("/posts", blogPostController.getAllPosts);

// Get a single blog post by ID
router.get("/posts/:id", blogPostController.getPostById);

// Update a blog post by ID
router.put("/posts/:id", authenticateToken, blogPostController.updatePost);

// Delete a blog post by ID
router.delete("/posts/:id", authenticateToken, blogPostController.deletePost);

// Add a comment to a blog post
router.post(
  "/posts/:id/comments",
  authMiddleware,
  blogPostController.addComment
);

module.exports = router;
