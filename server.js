const express = require("express")
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const userRouter = require("./src/routes/userRouter")
const adminCompanyRouter = require("./src/routes/adminCompanyRouter")
const companyRouter = require("./src/routes/companyRouter");
const  jwt  = require("jsonwebtoken");
const UserModel = require("./src/models/userModel");

const port = process.env.PORT
const dbConnectionLink = process.env.DB_CONNECTION_LINK
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(dbConnectionLink).then(res => {
    console.log("DB connected")
});

console.log(port);

app.use(cookieParser());
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        const user =await UserModel.findOne({email: decoded.email})
        req.user = user
    } catch (err) {
        console.log("Not authorized");
    }

    next()
})


app.get("/", (req, res) => {
    res.send("<h1>Jobportal</h1>")
})

app.use("/api/user", userRouter)
app.use("/api/admin", adminCompanyRouter)
app.use("/api/employer", companyRouter)

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);

})