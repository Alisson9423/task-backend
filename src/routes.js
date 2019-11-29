const express = require('express')
const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')

const AuthController = require('./Controllers/AuthController')
const Projects = require('./Controllers/projectController')
const Task = require('./Controllers/TaskController')
const User = require('./Controllers/UserController')

const routes = express.Router()

routes.post('/register', AuthController.store)
routes.post('/authenticate', AuthController.authenticate)

routes.use((req, res, next) => {

    const authHeader = req.headers.authorization


    if (!authHeader) {
        return res.status(401).send({ error: 'O token Não Foi Informado' })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token errado' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token Mal Formatado' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token Invalido' })

        req.userId = decoded.id
        return next()
    })

    //Projects 

    routes.post('/projects', Projects.store)
    routes.put('/projects/:projectId', Projects.update)
    routes.get('/projects', Projects.show)
    routes.get('/list', Projects.list)
    routes.get('/projects/:projectId', Projects.findUser)
    routes.delete('/projects/:projectId', Projects.remove)

    //Task
    routes.post('/task', Task.store)
    routes.get('/task', Task.list)
    routes.put('/task/:taskId', Task.update)

    //Users

    routes.get('/users', User.show)
})



module.exports = routes