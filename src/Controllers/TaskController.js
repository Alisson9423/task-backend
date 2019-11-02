const Project = require('../Models/Projects')
const Task = require('../Models/Task')



module.exports = {
    async store(req, res) {
        const { title, description, projectId, userId } = req.body

        try {
            const task = await Task.create({
                title,
                description,
                assignedTo: userId,
                project: projectId
            }).then(task => task = Task.find({ assignedTo: req.userId }))

            return res.send({ task });
        } catch (err) {
            return res.status(400).send({ erro: 'Erro ao criar nova Tarefa' });
        }
    },

    async list(req, res) {
        try {
            const task = await Task.find({ assignedTo: req.userId })

            return res.send(task);

        } catch (err) {
            return res.status(400).send({ erro: 'Erro ao carregar Tarefas' })
        }
    },

    async update(req, res) {
        try {
            const project = await Project.findByIdAndUpdate(req.params.projectId, {
                ...req.body,
            }, { new: true }).then(project => Project.findById(req.params.projectId).populate('user'));

            return res.send({ project });
        } catch (err) {

            return res.status(400).send({ erro: 'Erro ao atualizar novo Projeto' });
        }
    },

    async remove(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId);
            return res.send()

        } catch (err) {
            return res.status(400).send({ erro: 'Erro ao deletar Projeto' })
        }
    }
}