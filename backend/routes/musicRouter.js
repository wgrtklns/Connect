const Router = require('express')
const router = new Router()
const musicController = require('../controllers/musicController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/upload_m', authMiddleware, musicController.uploadMusic)
router.get('/jsonfile/:id', musicController.getMusicJSON)
router.get('/musicfile/:id', musicController.getMusicFile)
router.delete('/delete_m', authMiddleware, musicController.deleteMusic)
router.get('/check_music/:user_id', musicController.checkMusic)

router.get('/favorites/:username', authMiddleware, musicController.getFavorites)
router.post('/add_favorites', authMiddleware, musicController.addToFavorite)
router.delete('/delete_fav', authMiddleware, musicController.deleteFromFav)

router.get('/getall', authMiddleware, musicController.getAll)

module.exports = router