const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const getUserMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    var decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const user = await UserModel.findOne({ email: decoded.email })
    req.user = user
  } catch (err) {
    console.log("Not authorized");
  }
  next()
}



const adminOnlyMiddleware = (req, res, next) => {
  //   if(req.user.role === "admin"){
  //        next()
  // }else{
  //   return  res.status(401).json({message:"User is not an admin"})
  // }
  next()
}

const companyOnlyMiddleware = (req, res, next) => {
  if (req.user.role === "employer") {
    next()
  } else {
    return res.status(401).json({ message: "User is not an employer" })
  }

}


const jobseekerOnlyMiddleware = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: "User is not an employer" })
  }
}
module.exports = { adminOnlyMiddleware, companyOnlyMiddleware, getUserMiddleware, jobseekerOnlyMiddleware }