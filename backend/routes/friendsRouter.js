const Router = require('express')
const router = new Router()
const friendsController = require('../controllers/friendsController')

router.post('/add_friend', friendsController.addFriend)
router.get('/get_friend/:id', friendsController.getFriend)
router.post('/get_friends', friendsController.getFriends)
router.get('/get_all_friends', friendsController.getAllFriends)
router.delete('/delete_friend', friendsController.deleteFriend)

module.exports = router