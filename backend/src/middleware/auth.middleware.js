import jwt from "jsonwebtoken"
import config from "../config/config.js"


export const middleware = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            messaage: "token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret)

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            message :"invalide token",error
        })
    }

}
