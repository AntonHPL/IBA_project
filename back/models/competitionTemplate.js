const mongoose = require('mongoose');

const competitionTemplate = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Competitions', competitionTemplate)