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
        try {
            if (!email || !username  || !password) {
                return next(new Error('Incorrect password, email or username'))
            }
            // const candidate = await User.findOne({where: {[Op.or]: [{ email: email || null },{ username: username || null }]}})
            const candidate = await User.findOne({where: {[Op.or]: [{ email },{ username }]}})
            if (candidate) {
                return next(new Error('User with this username/email already created'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, username, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.username, user.role)
            return res.json({token})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Registration error!"})
        }
    }

    async login(req, res, next) {
        const {email, username, password} = req.body
        let user = undefined
        try {
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
            return res.json({token})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Login error!"})
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username, req.user.role)
        // console.log(req.user) all good!
        return res.json({token})
    }

    async getUsers(req, res) {
        const users = await User.findAll()
        return res.json({users})
    }

    async deleteUser(req, res) {
        const {id} = req.params
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const result = await User.destroy({where: {id}})
            if (result === 0) {
                return res.status(400).json({ message: 'Failed to delete user' });
            }
            return res.json({result})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Delete error!"})
        }
    }
}

module.exports = new UserController()