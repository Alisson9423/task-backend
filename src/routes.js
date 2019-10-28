const express = require('express')
const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')

const AuthController = require('./Controllers/AuthController')
const Projects = require('./Controllers/projectController')

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

    routes.post('/projects', Projects.store)
    routes.get('/projects', Projects.show)
    routes.get('/projects/:projectId', Projects.findUser)
    routes.delete('/projects/:projectId', Projects.remove)
})



module.exports = routes