const mongoose = require("mongoose");
const Job = require("../models/job.model");

exports.createJob = async (req, res) => {
  try {
    const allowedJobStatus = [
      "Full-time (On-site)",
      "Part-time (On-site)",
      "Full-time (Remote)",
      "Part-time (Remote)",
    ];
    const {
      title,
      companyName,
      locations = [],
      salary,
      jobType = "Part-time(On-site)",
      jobDescription,
      jobQualifications = [],
    } = req.body;

    if (
      !title ||
      !companyName ||
      !locations ||
      !salary ||
      !jobDescription ||
      !jobQualifications
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input: Please enter a valid input." });
    }

    if (!jobType || !allowedJobStatus.includes(jobType)) {
      return res
        .status(400)
        .json({ message: "Invalid Type: Please select the allowed job type." });
    }

    const job = new Job({
      title: title.trim(),
      companyName: companyName.trim(),
      locations,
      salary: Number(salary),
      jobType,
      jobDescription,
      jobQualifications,
    });
    const savedJob = await job.save();
    res.status(200).json({ savedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a job", error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs || jobs.length === 0) {
      res.status(404).json({ message: "No jobs found!!" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch the jobs data.",
        error: error.message,
      });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid JobId" });
    }

    const job = await Task.find(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found!!" });
    }

    const deleteJob = await Job.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the job" });
  }
};
