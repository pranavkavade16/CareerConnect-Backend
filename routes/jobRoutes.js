const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

// create a new job
router.post("/", jobController.createJob);

// read jobs
router.get("/", jobController.getJobs);

// delete jobs
router.delete("/:jobId", jobController.deleteJob);

module.exports = router;
