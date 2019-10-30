const Project = require('../Models/Projects')
const Task = require('../Models/Task')



module.exports = {
    async store(req, res) {
        try {
            const project = await Project.create({
                ...req.body, user: req.userId 
            }).then(project => Project.findById(project._id).populate('user'));
            
            return res.send({ project });
        } catch(err) {
            
            return res.status(400).send({ erro: 'Erro ao criar novo Projeto' });
        }
    },

    async update(req, res) {
        try {
            const project = await Project.findByIdAndUpdate(req.params.projectId, {
                    ...req.body,
                }, { new: true }).then(project => Project.findById(req.params.projectId).populate('user'));
                
            return res.send({ project });
        } catch(err) {
            
            return res.status(400).send({ erro: 'Erro ao atualizar novo Projeto' });
        }
    },

    async show(req, res) {
        try {
            const projects = await Project.find({ user: req.userId }).populate('user');

            return res.send(projects);

        } catch(err) {
            return res.status(400).send({ erro: 'Erro ao carregar Projetos' })
        }
    },

    async findUser(req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate('user');

            return res.send(project);

        } catch(err) {
            return res.status(400).send({ erro: 'Erro ao carregar Projeto' })
        }
    },

    async remove(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId);
            return res.send()

        } catch(err) {
            return res.status(400).send({ erro: 'Erro ao deletar Projeto' })
        }
    }
}