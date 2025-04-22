const {MusicFile, FavoriteList, User} = require('../models/models')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Sequelize, random } = require('../db')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads')
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        const filename = file.filename + '-' + uniqueSuffix + ext
        cb(null, filename)
    }
})

const upload = multer({ storage })

class MusicController {
    async uploadMusic(req, res) { // next? // TODO: Add text message
        try {
            upload.single('audio')(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error while uploading file" })
                }
                const { originalname, filename, path, size } = req.file
                let { audioname, artist, recipientType, mainId } = req.body

                
                // if (recipientType == 'friends') {
                //     const randomUsers = await User.findAll({
                //         order: Sequelize.fn('RANDOM'),
                //         limit: 5
                //     });
                // } else {
                //     const randomUsers = await User.findAll({
                //         order: Sequelize.fn('RANDOM'),
                //         limit: 5
                //     });
                // }
                
                const randomUsers = await User.findAll({
                    order: Sequelize.fn('RANDOM'),
                    limit: 5
                });
                
                let recipient_id = null;

                const filteredUsers = randomUsers.filter(user => user.dataValues.id !== mainId);
                
                if (filteredUsers.length > 0) {
                    const randomUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
                    recipient_id = randomUser.dataValues.id;
                }

                
                const date = new Date()

                const created_file = await MusicFile.create({
                    original_name: originalname, filename, audioname, artist, date, size, path, recipient_id
                })

                setTimeout(async () => {
                    try {
                        const musicFile = await MusicFile.findByPk(created_file.id);
                        if (musicFile) {
                            fs.unlinkSync(musicFile.path);
                            await musicFile.destroy();
                            console.log('File and database entry deleted');
                        }
                    } catch (err) {
                        console.error('Error while deleting file:', err);
                    }
                }, 600000);

                res.status(200).json({ created_file });
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: "Error during file upload"})
        }
    }

    async getMusicFile(req, res) { 
        try {
            const { id } = req.params
            const musicFile = await MusicFile.findByPk(id)
            if (!musicFile) {
                return res.status(404).json({ message: "Music file not found" })
            }
            // res.json({audioname: musicFile.audioname, artist: musicFile.artist})
            res.sendFile(path.resolve(musicFile.path))
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error getting music file"})
        }
    }

    async getMusicJSON(req, res) {
        try {
            const { id } = req.params
            const musicFile = await MusicFile.findByPk(id)
            if (!musicFile) {
                return res.status(500).json({message: "JSON file not found"})
            }
            res.json({audioname: musicFile.audioname, artist: musicFile.artist, user_id: musicFile.user_id, username: musicFile.username})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error JSON music"})
        }
    }

    async deleteMusic(req, res) {
        try {
            const { file_id } = req.body
            const musicFile = await MusicFile.findByPk(file_id)
            if(!musicFile) {
                return res.status(404).json({ message: "File not found" })
            }
            fs.unlinkSync(musicFile.path)
            await musicFile.destroy()
            return res.status(200).json({ message: "File deleted successfully"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error while deleting file"})
        }
    }

    async checkMusic(req, res) {
        try {
            const {user_id} = req.params
            const check = await MusicFile.findAll({where: {recipient_id: user_id}})
            if (!check) {
                return res.json({message: "You don`t have music"})
            }
            return res.json({check})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error check music!"})
        }
    }
    
    // Favorites list
 
    async getFavorites(req, res) {
        try {
            const { username } = req.params
            const user = await User.findOne({where: { username }})
            if (!user) {
                return res.status(500).json({message: "User not found"})
            }
            const favList = await FavoriteList.findAll({where: {user_id: user.id}})
            return res.json({favList})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error getting favorites"})
        }
    } 

    async addToFavorite(req, res) {
        try {
            const {user_id, original_name, audioname, artist} = req.body
            const user = await User.findOne({where: { id: user_id }})
            if (!user ) {
                return res.status(500).json({message: "User not found"})
            }
            const checkSong = await FavoriteList.findOne({where: {
                user_id,
                [Sequelize.Op.or]: [
                    {original_name: original_name}, {audioname: audioname}
                ]
            }})
            if (checkSong) {
                return res.status(200).json({ message: "Song already in the list" });
            }
            const song = await FavoriteList.create({
                user_id, original_name, audioname, artist
            })
            return res.json({song})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error add music"})
        }
    }

    async deleteFromFav(req, res) {
        try {
            const {user_id, audioname} = req.body
            const song = await FavoriteList.findOne({where: {user_id, audioname}})
            if (!song) {
                return res.status(400).json({ message: "Song not found" });
            }
            const result = await FavoriteList.destroy({where: {user_id, audioname}})
            res.json({result})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Error delete music"})
        }
    }

    // Test functions

    async getAll(req, res) {
        const musics = await MusicFile.findAll()
        res.json({musics})
    }
}

module.exports = new MusicController()