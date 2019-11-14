const Project = require('../Models/Projects')
const Task = require('../Models/Task')



module.exports = {
    async store(req, res) {

        const { title, description, projectId, userId } = req.body

        // 



        try {

            const task = await Task.create({
                title,
                description,
                assignedTo: userId,
                project: projectId
            }).then(task => Task.find({ assignedTo: req.userId, completed: false }).populate("project"))

            if (userId == req.userId) {
                return res.send({ task });
            } else {
                const taskUser = await Task.find({ assignedTo: userId, completed: false }).populate("project")
                req.io.emit('tasks', taskUser)

                return res.send({ task });
            }


        } catch (err) {
            console.log(err)
            return res.status(400).send({ erro: 'Erro ao criar nova Tarefa' });
        }
    },

    async list(req, res) {

        try {
            const task = await Task.find({ assignedTo: req.userId }).populate("project")

            return res.send(task);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ erro: 'Erro ao carregar Tarefas' })
        }
    },

    async update(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(req.params.taskId, {
                ...req.body,
            }, { new: true }).then(task => Task.find({ assignedTo: req.userId, completed: false }).populate("project"));

            return res.send({ task });
        } catch (err) {

            console.log(err)
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