const mongoose = require('../database')

const ProjectsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    taks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],

    creatdAt: {
        type: Date,
        default: Date.now,
    }
})

const Projects = mongoose.model('Projects', ProjectsSchema)

module.exports = Projects