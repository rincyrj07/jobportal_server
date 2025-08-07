const express = require("express")
const router = express.Router()
const { createCompanyController } = require("../controllers/companyController")
const { companyOnlyMiddleware } = require("../middlewares/authenticationMiddleware")


router.post( "/company", companyOnlyMiddleware, createCompanyController)

module.exports = router