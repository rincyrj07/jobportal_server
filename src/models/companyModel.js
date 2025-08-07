const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    
    // _id: {
    //     type: String,
    //     required: [true, "ID is required"],  
    // },
     name: {
        type: String,
        required: [true, "Name is required"], 
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        required: [true, "Image is required"]   
    },
     password:{
        type:String,
        required:[true,"Password id required"],
        minlength: [6, "Password must be at least 6 characters"] },

    }, {
        timestamps: true
    })
    
    const CompanyModel = mongoose.model("company", companySchema)
    module.exports = CompanyModel