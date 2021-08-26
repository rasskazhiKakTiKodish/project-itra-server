const express = require('express')
const app = express()
const cors =require('cors')

app.use(express.json())
app.use(cors())
const db=require('./models')
const postRouter = require('./routes/Collections')
app.use('/collections', postRouter)
const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter)
const usersRouter = require('./routes/Users')
app.use('/auth', usersRouter)
const likesRouter = require('./routes/Likes')
app.use('/likes', likesRouter)
const typesRouter = require('./routes/Types')
app.use('/types', typesRouter)


db.sequelize.sync().then(() => {
app.listen(3003,() => {
    console.log('Server running on port 3003')
    })
})