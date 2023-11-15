const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const {mustRole} = require('../middlewares/auth')

router.get('/', postController.getAllPost)
router.get('/:id', postController.getPostById)
router.post('/', mustRole('user'), postController.createPost)
router.put('/:id', mustRole('user'), postController.updatePost)
router.delete('/:id', mustRole('user'), postController.deletePost)
router.patch('/:id/like', mustRole('user'), postController.likePost)
router.patch('/:id/save', mustRole('user'),  postController.savePost)

module.exports = router
