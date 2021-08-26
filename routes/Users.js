const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcryptjs')

const {sign} = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post("/", async (req, res) => {
    const {username, password} = req.body
    bcrypt.hash(password, 12).then((hashedPassword) => {
        Users.create({
            username: username,
            password: hashedPassword
        })
        res.json("GOOD")
    })
})


router.post('/login',  async(req, res) => {
    const {username, password} = req.body

    const user = await Users.findOne({where: {username: username}})

    if(!user) res.json({error: "User doesn't exist!"})
    bcrypt.compare(password, user.password).then(async(match) => {
        if(!match) res.json({error: "wrong username and password combination"})
        const accessToken = sign({username: user.username, id: user.id}, "secretkey" )
        res.json({token:accessToken, username:username, id:user.id})
    })
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})


router.get("/basicinfo/:id", async (req,res) => {
    const id = req.params.id

    const basicInfo = await Users.findByPk(id, {attributes: {exclude:['password']}
})
res.json(basicInfo)
})


router.put('/changepassword', validateToken, async(req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await Users.findOne({where: {username: req.user.username}})

    bcrypt.compare(oldPassword, user.password).then(async(match) => {
        if(!match) res.json({error: "wrong password entered!"})

        bcrypt.hash(newPassword, 12).then((hashedPassword) => {
             Users.update({password: hashedPassword}, {where:{username: req.user.username}})
            res.json("GOOD")
        }) 
        
    })

})

module.exports = router