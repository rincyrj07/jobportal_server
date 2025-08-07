
//     `
// dob
// gender
// qualification
// designation
// experience
// `
const mongoose = require('mongoose')

const professionaldetailsSchema = new mongoose.Schema({
    dob: {
        type: Date,
        required: [true, "DOB is required"],

    },
    gender: {
        type: String,
        required: [true, "Gender is required "],
        enum: ["male", "female", "other"]
    },
    qualification: {
        type: String,
        required: [true, "Qualifacation is required"]
    },
    designation: {
        type: String,
        required: [true, "Current designation is required "]
    },
    experience: {
        type: Number,
        required: [true, "Working experience required in years and months"]
    }

}, {
    timestamps: true
})

const ProfessionaldetailsModel = mongoose.model("professionaldetails",professionaldetailsSchema)
module.exports = ProfessionaldetailsModel