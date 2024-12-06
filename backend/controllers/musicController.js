const {MusicFile, FavoriteList, User} = require('../models/models')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
    async uploadMusic(req, res) { // next?
        try {
            upload.single('audio')(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error while uploading file" })
                }

                const { originalname, filename, path, size } = req.file
                const { audioname, artist } = req.body
                const date = new Date()

                const created_file = await MusicFile.create({
                    original_name: originalname, filename, audioname, artist, date, size, path
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

    async getMusic(req, res) { // TODO: Add json with name and artist
        try {
            const { id } = req.params
            console.log(id)
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
    
    async addToFavorite(req, res) {

    }
 
    async getFavorites(req, res) {

    } 

    // async getFavSong(req, res) {}

    // async deleteFromFav(req, res) {}

    async getAll(req, res) {
        const musics = await MusicFile.findAll()
        res.json({musics})
    }
}

module.exports = new MusicController()