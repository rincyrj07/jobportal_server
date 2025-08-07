const express = require("express")
const router = express.Router()
const { updateRoleController, userListController } = require("../controllers/adminCompanyController")
const { adminOnlyMiddleware } = require("../middlewares/authenticationMiddleware")




router.get("/user-list", adminOnlyMiddleware, userListController)
router.put("/update-role", adminOnlyMiddleware, updateRoleController)
module.exports = router