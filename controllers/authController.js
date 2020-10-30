
require('dotenv').config()
const knex = require('../dbConfig');
const CryptoJS = require("crypto-js");
const User = require('../models/user');
const { generateToken } = require('../ultis');

function hashedPassword(password) {
    return CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
}

function decryptPassword(hashedPassword) {
    const bytes = CryptoJS.AES.decrypt(hashedPassword, process.env.CRYPTO_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}


const register = async (req, res) => {


    let { name, email, password } = req.body;

    try {
        const emailExits = await knex('users').where({ email });
        if (emailExits.length) {
            return res.status(409).json({
                message: "Email already, please use another email"
            })
        }
        let newPassword = hashedPassword(password);
        const user = await User.add({ name, email, password: newPassword })
        return res.status(200).json({
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })
    }

}

const login = async (req, res) => {
    let { email, password } = req.body;
    const [user] = await knex('users').where({ email }).returning('*');
    if (!user) {
        return res.status(401).json({
            message: "Email does not exits, please register"
        })
    }
    if (decryptPassword(user.password) !== password) {
        return res.status(401).json({
            message: 'Sai mat khau'
        })
    }
    const token = await generateToken(user,process.env.JWT_SECRET,process.env.ACCESS_TOKEN_LIFE);
    return res.status(200).json({
        user: {
            name: user.name,
            email: user.email
        },
        token
    })


}

module.exports = {
    register,
    login
}