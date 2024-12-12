const Router = require('express')
const router = new Router()
const friendsController = require('../controllers/friendsController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add_friend', authMiddleware, friendsController.addFriend)
router.get('/get_friend/:id', authMiddleware, friendsController.getFriend)
router.post('/get_friends', authMiddleware, friendsController.getFriends)
router.get('/get_all_friends', authMiddleware, friendsController.getAllFriends)
router.delete('/delete_friend', authMiddleware, friendsController.deleteFriend)

module.exports = router