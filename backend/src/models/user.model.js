import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
        unique : true
    },

    gmail:{
        type: String,
        required : true,
        unique : true
    },

    password:{
        type: String,
        required : true,
    },
})



const usermodel = mongoose.model("user",userSchema)

export default usermodel