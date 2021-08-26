const express = require('express')
const router = express.Router()
const {Collections, Likes} = require('../models')


const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/", validateToken, async (req, res) => {
    const listOfCollections = await Collections.findAll({include: [Likes]})
    const likedCollections = await Likes.findAll({where: {UserId: req.user.id}})
    res.json({listOfCollections: listOfCollections,likedCollections: likedCollections})
})



router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const collection = await Collections.findByPk(id)
    res.json(collection)
})

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id
    const listOfCollections = await Collections.findAll({
        where:{UserId: id},
        include: [Likes]
    })
    res.json(listOfCollections)
})

router.get('/bytypeId/:TypeId', async (req, res) => {
    const id = req.params.TypeId
    const listOfCollectionsByTypes = await Collections.findAll({
        where:{TypeId: id},
        include: [Likes]
    })
    res.json(listOfCollectionsByTypes)
})

router.post("/", validateToken, async (req, res) => {
    const collection =req.body
    collection.username = req.user.username
    collection.UserId = req.user.id

   await Collections.create(collection)
   res.json(collection)
})

router.put("/name", validateToken, async (req, res) => {
    const {newName, id} =req.body
    await Collections.update({name: newName}, {where:{id: id}})
   res.json(newName)
})

router.put("/text", validateToken, async (req, res) => {
    const {newText, id} =req.body
    await Collections.update({text: newText}, {where:{id: id}})
   res.json(newText)
})

router.delete("/:collectionId", validateToken, async(req, res) => {
    const collectionId = req.params.collectionId
    await Collections.destroy({
        where: {
            id: collectionId,
        }
    })

    res.json("Delete ok")
})





module.exports = router