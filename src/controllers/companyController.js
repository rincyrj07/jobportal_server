const CompanyModel = require("../models/companyModel")
const { getValidationErrorMessage } = require("../utils/validationUtils")

const createCompanyController = async (req, res) => {
    try {
        const data = req.body
        data.portal_admin = req.user._id
        const company = await (await CompanyModel.create(data)).populate("portal_admin")
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

const companyListController = async (req, res) => {

    try {
    const user = req.user
    const companyList = await CompanyModel.find({ portal_admin: user._id })
    res.json({ "message": "Company list fetched successfully", companyList })
    } catch (err) {
            res.status(500).json({ message: "Something went wrong in the server. Please try after some time" })
    }


}
module.exports = { createCompanyController, companyListController }