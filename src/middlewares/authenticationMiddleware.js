const adminOnlyMiddleware = (req, res, next) => {
      next()
}

const companyOnlyMiddleware = (req, res, next) => {
    next()
}

module.exports = {adminOnlyMiddleware, companyOnlyMiddleware}