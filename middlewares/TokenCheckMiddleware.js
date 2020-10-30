
require('dotenv').config();
const { verifyToken,getTokenFromRequest } = require('../ultis')
const {TokenExpiredError} = require('jsonwebtoken')

const tokenCheckMiddleware = async (req, res, next) => {
    const token= getTokenFromRequest(req);
    if (token) {
        try {
            const decode = await verifyToken(token, process.env.JWT_SECRET);
            req.user = decode.data;
            next();
        } catch (error) {
            if(error instanceof TokenExpiredError){
                return res.status(400).json({
                    message: 'Token is Expired'
                })
            }
            return res.status(400).json({
                message: 'Unauthorized access'
            })
        }
    } else {
        return res.status(403).json({
            message: "No token in provider"
        })
    }
}

module.exports = tokenCheckMiddleware;