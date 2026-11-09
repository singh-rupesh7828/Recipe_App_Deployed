import dotenv from "dotenv"


dotenv.config()

if (!process.env.MongoDb_URI) {
    console.log("mongoDB URI not found in config");
    
}

if (!process.env.jwt_secret) {
    console.log("jwt_secret not found in config");

}

if (!process.env.GEMINI_API_KEY) {
    console.log("GEMINI_API_KEY not found in config");

}

if (!process.env.Frontend_URL) {
    console.log("Frontend_URL is not found");
    
}

const config = {
    MongoDb_URI : process.env.MongoDb_URI,
    jwt_secret : process.env.jwt_secret,
    gemini_api_key :process.env.GEMINI_API_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    Frontend_URL: process.env.Frontend_URL
}

export default config