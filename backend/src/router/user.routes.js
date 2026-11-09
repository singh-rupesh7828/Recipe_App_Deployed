import express from "express"
import { getme, register, signinuser } from "../Controller/user.controller.js"

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/signin",signinuser)
authRouter.get("/getme",getme)


export default authRouter