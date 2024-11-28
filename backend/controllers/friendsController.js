const {User, Friends} = require('../models/models')
const { Op } = require('sequelize')
// first_id second_id
class FriendsController {
    async addFriend(req, res) {
        const {mainId, secondId} = req.body
        try {
            if (mainId === secondId) {
                return next(new Error('ID error!'))
            }
            const relationship = await Friends.findOne({
                where: {
                    [Op.or]: [
                        { first_id: mainId, second_id: secondId },
                        { first_id: secondId, second_id: mainId }
                    ]
                }
            });
            if(relationship) {
                return next(new Error('There is already such a couple'))
            }
            const friendship = await Friends.create({first_id: mainId, second_id: secondId})
            return res.json({friendship})
        } catch(err) {
            console.log(err)
            return res.status(500).json({message: "Add friend error!"})
        }
    }
    
    async getFriend(req, res) {
        const {id} = req.params
        try {
            const {first_id, second_id } = await Friends.findByPk(id)
            console.log({first_id, second_id })
            const user1 = await User.findOne({where: {id: first_id}, attributes: { exclude: ['password'] }})
            const user2 = await User.findOne({where: {id: second_id},  attributes: { exclude: ['password'] }})
            return res.json({user1, user2})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Friend info error!"})
        }
    }

    async getFriends(req, res) {
        const {username} = req.body;
        try {
            const user = await User.findOne({where: {username: username}})
            if (!user) {
                return next(new Error('User not found!'))
            }
            const friends = await Friends.findAll({
                where: {
                    [Op.or]: [
                        { first_id: user.id },
                        { second_id: user.id }
                    ]
                }
            });
            return res.json({friends})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "List friend error!"})
        }
    }

    async getAllFriends(req, res) { // TODO: Add check for admin
        const friends = await Friends.findAll()
        return res.json({friends})
    }

    async deleteFriend(req, res) {
        const {mainId, secondId} = req.body
        try {
            const relationship = await Friends.findOne({
                where: {
                    [Op.or]: [
                        { first_id: mainId, second_id: secondId },
                        { first_id: secondId, second_id: mainId }
                    ]
                }
            });
            if(!relationship) {
                return next(new Error('Relationship not found!'))
            }
            const friendship = await Friends.destroy({
                where: {
                    [Op.or]: [
                        { first_id: mainId, second_id: secondId },
                        { first_id: secondId, second_id: mainId }
                    ]
                }
            })
            return res.json({friendship})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Delete friend error!"})
        }
    }
}

module.exports = new FriendsController()