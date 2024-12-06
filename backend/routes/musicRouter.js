const Router = require('express')
const router = new Router()
const musicController = require('../controllers/musicController')

router.post('/upload_m', musicController.uploadMusic)
router.get('/get_m/:id', musicController.getMusic)
router.delete('/delete_m', musicController.deleteMusic)
router.post('/add_to_fav', musicController.addToFavorite)
router.get('/get_fav', musicController.getFavorites)
// router.get('/get_fav_song', musicController.getFavSong)
// router.delete('/delete_from_fav', musicController.deleteFromFav)
router.get('/getall', musicController.getAll)

module.exports = router