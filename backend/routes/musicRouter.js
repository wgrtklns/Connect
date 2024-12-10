const Router = require('express')
const router = new Router()
const musicController = require('../controllers/musicController')

router.post('/upload_m', musicController.uploadMusic)
router.get('/jsonfile/:id', musicController.getMusicJSON)
router.get('/musicfile/:id', musicController.getMusicFile)
router.delete('/delete_m', musicController.deleteMusic)

router.get('/favorites/:username', musicController.getFavorites)
router.post('/add_favorites', musicController.addToFavorite)
router.delete('/delete_fav', musicController.deleteFromFav)

router.get('/getall', musicController.getAll)

module.exports = router