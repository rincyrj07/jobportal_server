const adminOnlyMiddleware = (req, res, next) => {
      if(req.user.role === "admin"){
           next()
    }else{
      return  res.status(401).json({message:"User is not an admin"})
    }
}

const  companyOnlyMiddleware = (req, res, next) => {
    if(req.user.role === "employer"){
           next()
    }else{
      return  res.status(401).json({message:"User is not an employer"})
    }
   
}

module.exports = {adminOnlyMiddleware, companyOnlyMiddleware}