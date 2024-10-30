const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const { Op } = require('sequelize')

const generateJwt = (id, email, username, role) => {
    return jwt.sign(
        {id, email, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, username, password, role} = req.body
        if (!email || !password || !username) {
            return next(new Error('Incorrect password, email or username'))
        }
        const candidate = await User.findOne({where: {[Op.or]: [{ email },{ username }]}})
        if (candidate) {
            return next(new Error('User already created'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, username, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, username, password} = req.body
        let user
        if (email) {
            user = await User.findOne({where: {email}})
        } else if (username) {
            user = await User.findOne({where: {username}})
        }
        if(!user) {
            return next(new Error('User not found!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(new Error('Incorrect password!'))
        }
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json(token)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()