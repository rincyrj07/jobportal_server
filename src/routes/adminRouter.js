const express = require("express")

const { updateRoleController, userListController, toggleUserStatus } = require("../controllers/adminController")
const { adminOnlyMiddleware } = require("../middlewares/authenticationMiddleware")
const router = express.Router()



router.get("/user-list", adminOnlyMiddleware, userListController)
router.put("/update-role", adminOnlyMiddleware, updateRoleController)
router.get("/update-status", adminOnlyMiddleware, toggleUserStatus ) 
module.exports = router