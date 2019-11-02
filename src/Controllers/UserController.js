const Users = require('../Models/User')




module.exports = {
    async show(req, res) {
        try {
            const users = await Users.find();

            return res.send(users);

        } catch (err) {
            return res.status(400).send({ erro: 'Erro ao carregar Usuários' })
        }
    }
}