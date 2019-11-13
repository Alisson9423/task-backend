const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')

const routes = require('./routes')
const cors = require('cors')
const socketio = require('socket.io')
const http = require('http')

const server = http.Server(app)
const io = socketio(server)
const connectedUsers = {}


io.on('connection', sokect => {
    const { token } = sokect.handshake.query

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        connectedUsers[decoded.id] = sokect.id
    })

})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})


app.use(cors())
app.use(express.json())
app.use(routes)
server.listen(3333)