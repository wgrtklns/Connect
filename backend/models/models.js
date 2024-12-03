const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Friends = sequelize.define('friends', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
    second_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
    }, {
        indexes: [
            {unique: true, fields: ['first_id', 'second_id']},
            {unique: true, fields: ['second_id', 'first_id']}
        ]
    });

User.hasMany(Friends, { foreignKey: 'first_id'})
User.hasMany(Friends, { foreignKey: 'second_id'})

module.exports = {
    User, 
    Friends
};