const mongoose = require('mongoose');

const jobapplicationSchema = new mongoose.Schema({


    userId: {
        type: String,
        ref: 'User',
        required: [true, "ID is required"],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, "ID is required"],
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, "ID is required"],
    },
    status: {
        type: String,
        default: 'Pending',
    },
    date: {
        type: Number,
        required: true,
    }

}, {
    timestamps: true
})

const JobapplicationModel = mongoose.model("jobapplication", jobapplicationSchema)
module.exports = JobapplicationModel