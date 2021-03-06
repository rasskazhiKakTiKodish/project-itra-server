const express = require('express')
const router = express.Router()
const {Comments} = require('../models')
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get('/:collectionId', async (req, res) => {
    const collectionId = req.params.collectionId
    const comments = await Comments.findAll({where:{CollectionId: collectionId}})
    res.json(comments)
})

router.post("/", validateToken, async(req,res) => {
    const comment = req.body
    const username = req.user.username
    comment.username = username
    await Comments.create(comment)
    res.json(comment)
})

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId

    await Comments.destroy({
        where: {
            id: commentId,
        }
    })

    res.json("Delete ok")
})

module.exports = router