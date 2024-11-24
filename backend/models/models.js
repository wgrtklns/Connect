const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Friends = sequelize.define('friends', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'user', key: 'id'}},
    second_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'user', key: 'id'}}
})

User.belongsToMany(User, {through: Friends, foreignKey: 'first_id', otherKey: 'second_id'})

module.exports = {
    User,
    Friends
}