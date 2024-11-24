const Router = require('express')
const router = new Router()
const friendsController = require('../controllers/friendsController')

router.post('/add_friend', friendsController.addFriend)
router.get('/get_friend', friendsController.getFriend)
router.get('/get_friends', friendsController.getFriends)
router.delete('/delete_friend', friendsController.deleteFriend)

module.exports = router