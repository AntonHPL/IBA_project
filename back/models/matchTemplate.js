const mongoose = require('mongoose');

const matchTemplate = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    homeTeamName: {
        type: String,
        required: true 
    },
    awayTeamName: {
        type: String,
        required: true 
    },
    score: {
        type: String,
        reqired: false
    },
    date: {
        type: Date,
        required: true 
    },
    competition_id: {
        type: Number,
        required: true
    },
    season_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Matches', matchTemplate)