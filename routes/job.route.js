import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob
} from "../controllers/job.controller.js";

const router = express.Router();

// Post a new job (Admin)
router.route("/post").post(isAuthenticated, postJob);

// Get all jobs (User)
router.route("/get").get(isAuthenticated, getAllJobs);

// Get admin jobs (Admin)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// Get job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
