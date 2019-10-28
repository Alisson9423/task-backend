const Project = require('../Models/Projects')
const Task = require('../Models/Task')



module.exports = {
    async store(req, res) {
        try {
            const project = await Project.create({...req.body, user: req.userId })
            return res.send({ project })

        } catch {
            return res.status(400).send({ erro: 'Erro ao criar novo Projeto' })
        }
    },

    async show(req, res) {
        try {
            const projects = await Project.find({ user: req.userId }).populate('user');

            return res.send(projects);

        } catch {
            return res.status(400).send({ erro: 'Erro ao carregar Projetos' })
        }
    },

    async findUser(req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate('user');

            return res.send(project);

        } catch {
            return res.status(400).send({ erro: 'Erro ao carregar Projeto' })
        }
    },

    async remove(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId);
            return res.send()

        } catch {
            return res.status(400).send({ erro: 'Erro ao deletar Projeto' })
        }
    }
}