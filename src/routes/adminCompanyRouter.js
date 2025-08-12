const express = require("express")

const { updateRoleController, userListController } = require("../controllers/adminCompanyController")
const { adminOnlyMiddleware } = require("../middlewares/authenticationMiddleware")
const router = express.Router()



router.get("/user-list", adminOnlyMiddleware, userListController)
router.put("/update-role", adminOnlyMiddleware, updateRoleController)
module.exports = router