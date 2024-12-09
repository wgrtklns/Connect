const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) // localhost/api/registration
router.post('/login', userController.login)
router.get('/authorization', authMiddleware, userController.check) // authorization
router.get('/users',userController.getUsers)
router.delete('/delete/:id', userController.deleteUser)
router.get('/userinfo/:username', userController.getUser)

module.exports = router