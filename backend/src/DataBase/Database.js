import mongoose from "mongoose";
import config  from "../config/config.js";

if (!config.MongoDb_URI) {
    console.log("mongoDB URI not found in Database");
    
}

export const connectDB = ()=>{
    mongoose.connect(config.MongoDb_URI)
    .then(()=>{
        console.log("mongodb is connected");
        
    })
    .catch((e)=>{
        console.log("failed to connect DB", e);
        
    })
}