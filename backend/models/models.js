const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Friends = sequelize.define('friends', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    first_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
    second_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
    }, {
        indexes: [
            {unique: true, fields: ['first_id', 'second_id']},
            {unique: true, fields: ['second_id', 'first_id']}
        ]
    });

const MusicFile = sequelize.define('musicfile', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    original_name: {type: DataTypes.STRING, allowNull: false},
    filename: {type: DataTypes.STRING, allowNull: false},
    audioname: {type: DataTypes.STRING, allowNull: false},
    artist: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    size: {type: DataTypes.INTEGER, allowNull: false},
    path: {type: DataTypes.STRING, allowNull: false},
    recipient_id: {type: DataTypes.INTEGER, references: { model: 'users', key: 'id' }, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false}
});

const FavoriteList = sequelize.define('favorite_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    user_id: {type: DataTypes.INTEGER, references: { model: 'users', key: 'id' }, allowNull: false, onDelete: 'CASCADE' },
    original_name: {type: DataTypes.STRING, allowNull: false},
    audioname: {type: DataTypes.STRING, allowNull: false},
    artist: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Friends, { foreignKey: 'first_id'})
User.hasMany(Friends, { foreignKey: 'second_id'})

User.hasMany(FavoriteList, { foreignKey: 'user_id'})
FavoriteList.belongsTo(User, { foreignKey: 'user_id'})

User.hasMany(MusicFile, { foreignKey: 'recipient_id'})
MusicFile.belongsTo(User, { foreignKey: 'user_id'});

module.exports = {
    User, 
    Friends,
    MusicFile,
    FavoriteList
};
