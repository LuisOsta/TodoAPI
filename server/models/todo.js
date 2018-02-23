var mongoose = require('mongoose');

var Todo =mongoose.model('Todo', {
    text: {
        type: String,
        require: true,
        trim: true,
        minlen: 1
        
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
})

module.exports = {
    Todo
}