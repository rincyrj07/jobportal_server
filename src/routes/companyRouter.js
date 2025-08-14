const express = require("express")
const router = express.Router()

const { createCompanyController, companyListController } = require("../controllers/companyController")
const { companyOnlyMiddleware } = require("../middlewares/authenticationMiddleware")


router.post( "/company",  companyOnlyMiddleware, createCompanyController)
router.get("/company" , companyOnlyMiddleware, companyListController)

module.exports = router