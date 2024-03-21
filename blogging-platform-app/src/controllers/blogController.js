const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

// POST route to create a new blog post
router.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await BlogPost.create({
      title,
      content,
      author: req.user.id, // Assuming user ID is stored in req.user.id after authentication
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update an existing blog post by its ID
router.put("/posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete a blog post by its ID
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to retrieve details of a specific blog post by its ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to list all blog posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
