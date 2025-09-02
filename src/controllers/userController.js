const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { getValidationErrorMessage } = require("../utils/validationUtils");

const saltRounds = Number(process.env.SALT_ROUNDS)
const JWT_SECRET = process.env.JWT_SECRET

const registerController = async (req, res) => {
    try {
        const { email, password, profile_pic, phone } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(400).json({ message: "User with this Email ID already exists" })
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                console.log(err);

                if (hash) {
                    try {
                        const newUser = await UserModel.create({
                            email, password: hash, profile_pic, phone
                        })
                        res.json({ message: " User registetred successfully" })
                    } catch (err) {
                        if (err.name === "ValidationError") {
                            const message = getValidationErrorMessage(err)
                            res.status(400).json({ message: message })
                        } else {
                            res.json({ message: "Something went wrong in the server. Please try after some time" })
                        }
                    }
                } else {
                    res.status(400).json({ message: " Passsword is required" })
                }
                // Store hash in your password DB.
            });
        }
    }
    catch (err) {
        // if (err.name === "ValidationError") {
        //     console.log(err.errors)
        res.json({ message: "Something went wrong in the server. Please try after some time" })
    }
}
// }

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email ID and password is required" })
        }
        const user = await UserModel.findOne({ email })

        if (user) {
            if (user.status === "inactive") {
                return res.status(401).json({ message: "Account is inactive. Please contact admin" })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ email }, JWT_SECRET)
                    res.cookie('token', token, {
                        maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "None",
                        secure: true
                    }).json({ "message": "Login successfull" }); // maxAge in milliseconds
                } else {
                    res.status(401).json({ "message": "Invalid credentials" })
                }
            });
        } else {
            res.status(401).json({ "message": "Invalid credentials" })
        }
    }
    catch (err) {
        res.status(500).json({ "message": "Something went wrong in the server. Please try after some time" })
    }
}
module.exports = { registerController, loginController }