const express = require('express')
const router = express.Router()
const {Types} = require('../models')

const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/", async (req,res) => {
    const listOfTypes = await Types.findAll()
    res.json({listOfTypes: listOfTypes})
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const type = await Types.findByPk(id)
    res.json(type)
})


router.post("/",  async (req, res) => {
    const type =req.body
   await Types.create(type)
   res.json(type)
})



module.exports = router