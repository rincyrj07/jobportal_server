const CompanyModel = require("../models/companyModel");
// const { populate } = require("../models/userModel");
const { getValidationErrorMessage } = require("../utils/validationUtils")

const createCompanyController = async (req, res) => {
    console.log("Working");
    
    try {
        const data = req.body
        data.admin = req.user._id
        const company = await (await CompanyModel.create(data)).populate("admin")
        res.json({ message: "Company added successfully", company })
    } catch (err) {
        if (err.name === "ValidationError") {
            const message = getValidationErrorMessage(err)
            res.status(400).json({ message: message })
        }
        else {
            res.status(500).json({ message: "Something went wrong in the server. Please try after some time" })
        }
    }

}

module.exports = { createCompanyController }