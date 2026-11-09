import usermodel from "../models/user.model.js";
import bcrypt from "bcrypt"
import config from "../config/config.js";
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { username, gmail, password } = req.body

    const finduser = await usermodel.findOne({
        $or: [{ username },
        { gmail }]
    })

    if (finduser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const createuser = await usermodel.create({
        username,
        gmail,
        password: hashpassword
    })



    const token = jwt.sign(
        { user: createuser._id },
        config.jwt_secret,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "user created succesfully",
        user: {
            userId: createuser._id
        }
    })
}


export const signinuser = async (req, res) => {
    const { username, gmail, password } = req.body

    if (!username && gmail) {
        return res.status(401).json({
            message: "Enter Username or Gmail"
        })
    }

    const finduser = await usermodel.findOne({
        $or: [
            { username },
            { gmail }
        ]
    })

    if (!finduser) {
        return res.status(401).json({
            message: "Invalind Username or Gmail"
        })
    }

    const compairpassword = bcrypt.compare(password, finduser.password)

    if (!compairpassword) {
        return res.status(401).json({
            message: "invalid username/gmail or Password"
        })
    }

    const token = jwt.sign(
        { user: finduser._id },
        config.jwt_secret,
        { expiresIn: "1h" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user signin succesfull",
        user: {
            username,
            user: finduser._id
        }
    })
}


export const getme = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "token not found"

        })
    }

    const decoded = jwt.verify(token, config.jwt_secret)

    const finduser = await usermodel.findById(decoded.user)

    res.status(200).json({
        message: "user found succesfully",
        user: {
            username: finduser.username,
            gmail: finduser.gmail
        }
    })

}