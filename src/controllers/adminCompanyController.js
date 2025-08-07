const UserModel = require("../models/userModel")
const { getValidationErrorMessage } = require("../utils/validationUtils");

const userListController = async (req, res) => {

    try {
        const roleFilter = req.query.role
        let users
        if (roleFilter) {
            users = await UserModel.find({ role: roleFilter })
        } else {
            users = await UserModel.find()
        }
        res.json({ message: "Fetched users successfully", users })
    } catch (err) {
        res.status(500).json({ "message": "Something went wrong in the server. Please try again" })
    }

}


const updateRoleController = async (req, res) => {
    try {
        const userId = req.body.userID
        const userRole = req.body.userRole

        const user = await UserModel.findById(userId)
        user.role = userRole
        await user.save()

        res.json({ "message": "Role updated successfully" })
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
module.exports = { updateRoleController, userListController }