const express = require("express")
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var cors = require('cors')

require('dotenv').config()
console.log(process.env.CLIENT_URL);

var corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200 ,
  credentials: true
}
app.use(cors(corsOptions))

const userRouter = require("./src/routes/userRouter")
const adminRouter = require("./src/routes/adminRouter")
const companyRouter = require("./src/routes/companyRouter");
const jobseekerRouter = require("./src/routes/jobseekerRouter");
const { getUserMiddleware } = require("./src/middlewares/authenticationMiddleware");

// const UserModel = require("./src/models/userModel");

const port = process.env.PORT
const dbConnectionLink = process.env.DB_CONNECTION_LINK


mongoose.connect(dbConnectionLink).then(res => {
    console.log("DB connected")
});

console.log(port);

app.use(cookieParser());
app.use(express.json());
app.use(getUserMiddleware)


app.get("/", (req, res) => {
    res.send("<h1>Jobportal</h1>")
})

app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/employer", companyRouter)
app.use("/api/jobseeker", jobseekerRouter)

app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);

})