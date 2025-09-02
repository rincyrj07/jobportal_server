const express= require("express")
const  {applyCompanyController , professionaldetailsController} = require("../controllers/jobseekerController")
const {jobseekerOnlyMiddleware} = require("../middlewares/authenticationMiddleware")
const router = express.Router()

router.put("/apply-company", jobseekerOnlyMiddleware, applyCompanyController)
router.post("/professional-details", jobseekerOnlyMiddleware, professionaldetailsController)

module.exports = router