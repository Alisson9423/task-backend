const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-cjueh.mongodb.net/Task?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose