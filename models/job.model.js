const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }, 
    jobType: {
        type: String,
        enum: ['Full-time (On-site)', 'Part-time (On-site)', 'Full-time (Remote)', 'Part-time (Remote)'],
        default: "Part-time (On-site)",
    },
    jobDescription: {
        type: String,
        required: true,
    }, 
    jobQualifications: [{type: String}]

}, {
    timestamps: true,
})

module.exports = mongoose.model("Job", jobSchema)

