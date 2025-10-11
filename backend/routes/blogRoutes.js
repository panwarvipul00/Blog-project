import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
