const User = require('../Models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async store(req, res) {
        const { email } = req.body

        const findUser = await User.findOne({ email })

        try {
            if (await User.findOne({ email })) {
                return res.send({
                    token: generateToken({ id: findUser._id })
                })
            }

            const user = await User.create(req.body)

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user._id })
            })

        } catch (err) {
            return res.status(400).send({ error: 'Falha ao Resgistrar' })
        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).send({ error: 'Usuário Não Encontrado' })
        }

        if (!await bcryptjs.compare(password, user.password)) {
            return res.status(400).send({ erro: 'Senha Invalida' })
        }

        user.password = undefined;

        res.send({
            user,
            token: generateToken({ id: user._id })
        })

    }
}