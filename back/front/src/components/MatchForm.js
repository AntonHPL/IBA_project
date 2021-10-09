import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Message from './Message';
import axios from 'axios';

const MatchForm = ({seasons, isCompetitionInStorage}) => {
    const [matchesIds, setMatchesIds] = useState([]);

    const [matchHomeTeamName, setMatchHomeTeamName] = useState('');
    const [matchAwayTeamName, setMatchAwayTeamName] = useState('');
    const [matchScore, setMatchScore] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [matchId, setMatchId] = useState('');
    
    const [changed, setChanged] = useState(false);
    const [message, setMessage] = useState(false);
    const [seasonInStorage, setIsSeasonInStorage] = useState(false)

    const changeMatchId = (e) => {
        setMatchId(e.target.value);
    }

    const changeMatchHomeTeamName = (e) => {
        setMatchHomeTeamName(e.target.value);
    }

    const changeMatchAwayTeamName = (e) => {
        setMatchAwayTeamName(e.target.value);
    }

    const changeMatchScore = (e) => {
        setMatchScore(e.target.value);
    }

    const changeMatchDate = (e) => {
        setMatchDate(e.target.value);
    }

    const onClick = (e) => {
        e.preventDefault();

        const newMatch = {
            _id: matchId,
            homeTeamName: matchHomeTeamName,
            awayTeamName: matchAwayTeamName,
            score: matchScore || '',
            date: matchDate,
            competition_id: +localStorage.getItem("clicked_competition"),
            season_id: +localStorage.getItem("clicked_season")
        }
        axios.post('http://localhost:4000/app/newMatch', newMatch)
            .then(() => {
                setMatchId('');
                setMatchHomeTeamName('');
                setMatchAwayTeamName('');
                setMatchScore('');
                setMatchDate('');
            })
            .then(() => alert("The Match has been successfully created!"))
    }

    useEffect(() => {
        axios.get('http://localhost:4000/app/getMatches')
            .then(res => res.data)
            .then(res => {
                for(let i = 0; i < res.length; i++) {
                    matchesIds[i] = res[i]._id
                };
                setMatchesIds(matchesIds);
            });
    }, [matchesIds])

    useEffect(() => {
        if(matchesIds.includes(+matchId)) {
            setMessage("This Match id already exists. Please choose another Match id.");
        } else {
            setMessage("");
        }
    }, [matchId, matchesIds]);
    
    return(
        <div className = "formContainer">
            <div>
                <button className = "open_button" onClick = {() => setChanged(!changed)}>
                    Would you like to create a new Match?
                </button>
            </div>
            <div style = {{display: changed ? "block" : "none"}}>
                <div className = "createHeader">
                    <h1>Create a new Match</h1>
                </div>
                <p style = {{margin: '0'}}>Please be sure that <i><b>the Competition and the Season are chosen</b></i> before you start creating a new Match.</p>
                <Select
                    color = "blue"
                    placeholder = "Which Season does a new Match belong to?"
                    onChange = {(e) => {
                        localStorage.setItem("clicked_season", e.id);
                        setIsSeasonInStorage(true);
                    }}
                    options = {seasons}
                />
                <div className = "formPlusMessageContainer">
                    <form className = "creationForm">
                        <div className = "input_container">
                            <label htmlFor = "enterMatchId">
                                <span className = "star">*</span>Match id:
                            </label>
                            <input
                                id = "enterMatchId"
                                type = "number"
                                value = {matchId}
                                placeholder = "Enter a Match id"
                                autoComplete = "off"
                                onChange = {(e) => changeMatchId(e)}>
                            </input>
                        </div>
                        <div className = "input_container">
                            <label htmlFor = "enterMatchHTName">
                                <span className = "star">*</span>Home Team name:
                            </label>
                            <input
                                id = "enterMatchHTName"
                                type = "text"
                                value = {matchHomeTeamName}
                                placeholder = "Enter a Match Home Team name"
                                autoComplete = "off"
                                onChange = {(e) => changeMatchHomeTeamName(e)}>
                            </input>
                        </div>
                        <div className = "input_container">
                            <label htmlFor = "enterMatchATName">
                                <span className = "star">*</span>Away Team name:
                            </label>
                            <input
                                id = "enterMatchATName"
                                type = "text"
                                value = {matchAwayTeamName}
                                placeholder = "Enter a Match Away Team name"
                                autoComplete = "off"
                                onChange = {(e) => changeMatchAwayTeamName(e)}>
                            </input>
                        </div>
                        <div className = "input_container">
                            <label htmlFor = "enterMatchScore">
                                Score:
                            </label>
                            <input
                                id = "enterMatchScore"
                                type = "text"
                                value = {matchScore}
                                placeholder = "Enter a Match score ((__:__) is a preferred format)."
                                autoComplete = "off"
                                onChange = {(e) => changeMatchScore(e)}>
                            </input>
                        </div>
                        <div className = "input_container">
                            <label htmlFor = "enterMatchDate">
                                <span className = "star">*</span>Date:
                            </label>
                            <input
                                id = "enterMatchDate"
                                type = "text"
                                onFocus = {(e) => e.target.type = "date"}
                                onBlur = {(e) => e.target.type = "text"}
                                value = {matchDate}
                                placeholder = "Enter a Match date"
                                autoComplete = "off"
                                onChange = {(e) => changeMatchDate(e)}>
                            </input>
                        </div>
                        <button
                            className = "submit_button"
                            disabled = {matchId && matchHomeTeamName &&
                                matchAwayTeamName && matchDate &&
                                isCompetitionInStorage && seasonInStorage && !matchesIds.includes(+matchId) ?
                                false : true}
                            onClick = {(e) => onClick(e)}>
                                Create a new Match
                        </button>
                    </form>
                    <div className = "message_container" style ={message ? {border: '2px solid #FF0000'} : {border: '2px solid #00FF00'}}>
                        <Message message = {message}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchForm;