const BlogPost = require("../models/BlogPost");

const blogPostService = {};

// Create a new blog post
blogPostService.createPost = async (postData, authorId) => {
  try {
    const { title, content } = postData;
    const newPost = await BlogPost.create({
      title,
      content,
      author: authorId,
    });
    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all blog posts
blogPostService.getAllPosts = async () => {
  try {
    const posts = await BlogPost.find().populate("author", "username");
    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a single blog post by ID
blogPostService.getPostById = async (postId) => {
  try {
    const post = await BlogPost.findById(postId).populate("author", "username");
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a blog post by ID
blogPostService.updatePost = async (postId, postData) => {
  try {
    const { title, content } = postData;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a blog post by ID
blogPostService.deletePost = async (postId) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new Error("Post not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add a comment to a blog post
blogPostService.addComment = async (postId, commentData, authorId) => {
  try {
    const { text } = commentData;
    const newComment = {
      user: authorId,
      text,
    };
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment } },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = blogPostService;
