const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) // localhost/api/registration
router.post('/login', userController.login)
router.get('/authorization', authMiddleware, userController.check) // authorization
router.get('/users', authMiddleware, userController.getUsers)
router.delete('/delete/:id', authMiddleware, userController.deleteUser)
router.get('/userinfo/:username', authMiddleware, userController.getUser)
router.get('/makeAdmin/:username', authMiddleware, userController.makeAdmin)

module.exports = router