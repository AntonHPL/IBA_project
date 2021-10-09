const express = require('express');
const router = express.Router();
const competitionTemplateCopy = require('../models/competitionTemplate');
const seasonTemplateCopy = require('../models/seasonTemplate');
const matchTemplateCopy = require('../models/matchTemplate');

var ObjectId = require('mongoose').Schema.Types.ObjectId; 
var x = new ObjectId("1");

router.post('/newCompetition', (request, response) => {
    const newCompetition = new competitionTemplateCopy({
        _id: request.body._id,
        name: request.body.name,
    })
    newCompetition.save()
    .then(data => response.json(data))
    .catch(error => response.json(error))
})

router.post('/newSeason', (request, response) => {
    const newSeason = new seasonTemplateCopy({
        _id: request.body._id,
        name: request.body.name,
        competition_id: request.body.competition_id
    })
    newSeason.save()
    .then(data => response.json(data))
    .catch(error => response.json(error))
})

router.post('/newMatch', (request, response) => {
    const newMatch = new matchTemplateCopy({
        _id: request.body._id,
        homeTeamName: request.body.homeTeamName,
        awayTeamName: request.body.awayTeamName,
        score: request.body.score,
        date: request.body.date,
        competition_id: request.body.competition_id,
        season_id: request.body.season_id
    })
    newMatch.save()
    .then(data => response.json(data))
    .catch(error => response.json(error))
})

router.get('/getCompetitions', (request, response) => {
    competitionTemplateCopy.find()
    .then(data => response.json(data))
    .catch(error => response.json(error))
});

router.get('/getSeasons', (request, response) => {
    seasonTemplateCopy.find()
    .then(data => response.json(data))
    .catch(error => response.json(error))
});

router.get('/getSeasons/:id', (request, response) => {
    seasonTemplateCopy.find({competition_id: request.params.id})
    .then(data => response.json(data))
    .catch(error => response.json(error))
});

router.get('/getMatches', (request, response) => {
    matchTemplateCopy.find()
    .then(data => response.json(data))
    .catch(error => response.json(error))
});

router.get('/getMatches/:id', (request, response) => {
    matchTemplateCopy.find({season_id: request.params.id})
    .then(data => response.json(data))
    .catch(error => response.json(error))
});

module.exports = router;