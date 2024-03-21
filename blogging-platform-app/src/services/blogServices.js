const BlogPost = require("../models/BlogPost");

const createPost = async (postData, authorId) => {
  try {
    const { title, content } = postData;
    const newPost = await BlogPost.create({
      title,
      content,
      author: authorId,
    });
    return newPost;
  } catch (error) {
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    const posts = await BlogPost.find().populate("author", "username");
    return posts;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const post = await BlogPost.findById(postId).populate("author", "username");
    return post;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postId, postData) => {
  try {
    const { title, content } = postData;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    throw error;
  }
};

const addComment = async (postId, commentData, authorId) => {
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
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
};
