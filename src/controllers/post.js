const {
    post: postModel,
    user: userModel,
    user_like_post: user_like_postModel,
    user_save_post: user_save_postModel
} = require('../../models')
const { postSchema } = require('../validations/post')

exports.getAllPost = async (req, res, next) => {
    try {
        const { page = 1, perPage = 4 } = req.query
        const posts = await postModel.findAll({
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username']
            },
            offset: (parseInt(page) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            order: [['id', 'ASC']],
            attributes: ['id', 'title']
        })

        res.status(200).send({
            data: posts
        })
    } catch (error) {
        next(error)
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        const post = await postModel.findByPk(req.params.id, {
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username', 'name']
            }
        })

        res.status(200).send({
            data: post
        })
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { error } = postSchema.validate(req.body)
        if (error) throw error

        const post = await postModel.create({
            ...req.body,
            user_id: req.userId
        })
        res.status(201).send({
            message: 'Create post success'
        })
    } catch (error) {
        next(error)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { error } = postSchema.validate(req.body)
        if (error) throw error

        const post = await postModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Update post success'
        })
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await postModel.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Delete post success'
        })
    } catch (error) {
        next(error)
    }
}

exports.likePost = async (req, res, next) => {
    try {
        const user_id = req.userId
        const post_id = req.params.id
        const userlikePost = await user_like_postModel.findOrCreate({
            where: {
                user_id,
                post_id,
            }
        })

        res.status(200).send({
            message: 'Like post success'
        })
    } catch (error) {
        next(error)
    }
}

exports.savePost = async (req, res, next) => {
    try {
        const user_id = req.userId
        const post_id = req.params.id
        const userSavePost = await user_save_postModel.findOrCreate({
            where: {
                user_id,
                post_id,
            }
        })

        res.status(200).send({
            message: 'Save post success'
        })
    } catch (error) {
        next(error)
    }
}