const express= require("express")
const  {applyCompanyController} = require("../controllers/jobseekerController")
const {jobseekerOnlyMiddleware} = require("../middlewares/authenticationMiddleware")
const router = express.Router()

router.put("/apply-company", applyCompanyController, jobseekerOnlyMiddleware)

module.exports = router