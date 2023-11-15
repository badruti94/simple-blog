const express = require('express')
const router = express.Router()
const authRoute = require('./auth')
const postRoute = require('./post')
const userRoute = require('./user')

router.use('/auth', authRoute)
router.use('/post', postRoute)
router.use('/user', userRoute)


module.exports = router