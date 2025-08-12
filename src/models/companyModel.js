const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    
    
    // _id: {
    //     type: String,
    //     required: [true, "ID is required"],  
    // },
    //  name: {
    //     type: String,
    //     required: [true, "Name is required"], 
    // },
    // email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //     unique: true,
    //     trim: true,
    //     lowercase: true
    // },
    //  password:{
    //     type:String,
    //     required:[true,"Password id required"],
    //     minlength: [6, "Password must be at least 6 characters"] 
    // },
    // image: {
    //     type: String,
    //     required: [true, "Image is required"]   
    // },

    company_name: {
        type: String,
        required: [true, "Name is required"], 
        unique:true,
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Location is required"], 
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Company admin is required"], 
    },
     contact_details: {
        type: String,
        required: [true, "Contact details is required"], 
    },
    company_image:{
        type: String,
        trim: true,
    }
    

    }, {
        timestamps: true
    })
    
    const CompanyModel = mongoose.model("company", companySchema)
    module.exports = CompanyModel