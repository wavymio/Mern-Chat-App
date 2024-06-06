const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { app, server } = require('./socket/socket')

const authRoute = require('./routes/authRoutes')
const messageRoute = require('./routes/messageRoutes')
const userRoute = require('./routes/userRoutes')

const connectToMongodb = require('./db/connnect')

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.get('/health', (req, res) => {
    res.status(200).send("I am healthy")
})

app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)

server.listen(8080, () => {
    connectToMongodb()
    console.log("App connected successfully")
})