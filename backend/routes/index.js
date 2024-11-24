const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const friendsRouter = require('./friendsRouter')

router.use('/user', userRouter)
router.use('/friend', friendsRouter)

module.exports = router