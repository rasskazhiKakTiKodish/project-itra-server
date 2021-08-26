const express = require('express')
const router = express.Router()
const {Likes} = require('../models')
const {validateToken} = require('../middlewares/AuthMiddleware')



router.post('/', validateToken, async(req, res) => {
    const {CollectionId} =req.body
    const UserId = req.user.id

    const found = await Likes.findOne({where: {CollectionId: CollectionId, UserId: UserId}})
    if(!found){
   await Likes.create({CollectionId: CollectionId, UserId: UserId})
   res.json({liked: true})
    } else {
        await Likes.destroy({
            where: {
                CollectionId: CollectionId,
                UserId: UserId
            }
        })
        res.json({liked: false})
    }

})

module.exports = router