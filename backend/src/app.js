import express from "express"
import { connectDB } from "./DataBase/Database.js"
import authRouter from "./router/user.routes.js"
import recipeRouter from "./router/recipe.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import config from "./config/config.js"

const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin :config.Frontend_URL,
    credentials: true
}))


app.use("/auth", authRouter)
app.use("/recipe", recipeRouter)

export default app