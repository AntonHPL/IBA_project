const mongoose = require('mongoose');

const seasonTemplate = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    competition_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Seasons', seasonTemplate)