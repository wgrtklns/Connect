const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const friendsRouter = require('./friendsRouter')
const musicRouter = require('./musicRouter')

router.use('/user', userRouter)
router.use('/friend', friendsRouter)
router.use('/music', musicRouter)
module.exports = router