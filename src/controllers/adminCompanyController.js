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

const toggleUserStatus = async (req, res) => {
    const user = await UserModel.findById(req.query.userID)
    if(user.status === "active"){
        user.status = "inactive"
    }else{
        user.status = "active"
    }
    await user.save()
    res.json({message: "User Status updated successfully" , user})
}

//----------------------------------------------------------------------------
// const toggleUserStatus = async (req, res) => {
//     try {
        
//         const user = await UserModel.findById(req.query.userID);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         user.status = user.status === "active" ? "inactive" : "active";
//         await user.save();
//         res.status(200).json({ message: "User status updated successfully", user });
//     } catch (err) {
//         console.error(error); // Log the error for debugging.
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// };
//-------------------------------------------------------------------------------


module.exports = { updateRoleController, userListController , toggleUserStatus }