
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");


router.get("/posts", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);
router.get("/author/:id", postController.findPostsByAuthor);

module.exports = router;