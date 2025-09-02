const CompanyModel = require("../models/companyModel")
const ProfessionalDetailsModel = require("../models/professionalDetailsModel")
const { getValidationErrorMessage } = require("../utils/validationUtils")


const applyCompanyController = async (req, res) => {
    try {
        const user = req.user
        const companyID = req.body.companyID
        const company = await CompanyModel.findById(companyID)
        user.company = companyID
        await user.save()

        res.json({ message: "Applied successfully", company })

    } catch (err) {
        if (err.name === "ValidationError") {
            const message = getValidationErrorMessage(err)
            res.status(400).json({ message: message })
        }
        else if (err.name === "Cast Error") {
            console.log(err.message)
            res.status(500).json({ message: err.message })
        }
        else {
            res.status(500).json({ message: "Something went wrong in the server. Please try after some time" })
        }
    }
}

const professionaldetailsController = async (req, res) => {

    try {
        const data = req.body
        const professionalDetails = await ProfessionalDetailsModel.create(data)
        const user = req.user
        user.professional_details = professionalDetails._id
        res.json({ message: "Professional details created successfully", professionalDetails })
    } catch (err) {
        if (err.name === "ValidationError") {
            const message = getValidationErrorMessage(err)
            res.status(400).json({ message: message })
        }
        else if (err.name === "Cast Error") {
            console.log(err.message)
            res.status(500).json({ message: err.message })
        }
        else {
            res.status(500).json({ message: "Something went wrong in the server. Please try after some time" })
        }
    }

}


module.exports = { applyCompanyController, professionaldetailsController }