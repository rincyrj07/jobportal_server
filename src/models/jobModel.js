const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],

    },
    description: {
        type: String,
        required: [true, "Job description is required"],
    },
    location: {
        type: String,
        required: [true, "Job location is required"],
    },
    category: {
        type: String,
        required: [true, "Job category is required"],
    },
    salary: {
        type: Number,
        required: [true, "Salary package is required"],
    },
    date: {
        type: Number,
        required: [true,],
    },
    visible: {
        type: Boolean,
        required: [true,],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true,],
        
    }
}, {
    timestamps: true
})

const JobModel = mongoose.model("job", jobSchema)
module.exports = JobModel