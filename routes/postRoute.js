const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
} = require("../controllers/postController");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("post/update/:id").put(isLoggedIn, updatePost);
router.route("post/update/:id").delete(isLoggedIn, deletePost);
router.route("posts").get(getPosts);

module.exports = router;
