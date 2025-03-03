import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.route("/").post(createJob);
router.route("/:id").patch(updateJob);
router.route("/:id").delete(deleteJob);
router.route("/:id").get(getJob);
router.route("/").get(getAllJobs);

export default router;
