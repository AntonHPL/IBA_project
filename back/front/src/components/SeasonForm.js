import React, {useState, useEffect} from 'react';
import Message from './Message';
import Select from 'react-select';
import MatchForm from './MatchForm'
import axios from 'axios';

const SeasonForm = ({competitions}) => {
    const [seasons,setSeasons] = useState([]);
    const [seasonsIds, setSeasonsIds] = useState([]);
    const [changed, setChanged] = useState(false);
    const [message, setMessage] = useState('');

    const [seasonName, setSeasonName] = useState('');
    const [seasonId, setSeasonId] = useState('');

    const [isCompetitionInStorage, setIsCompetitionInStorage] = useState(false);
    
    const changeSeasonName = (e) => {
        setSeasonName(e.target.value);
    }

    const changeSeasonId = (e) => {
        setSeasonId(e.target.value);
    }

    const onClick = (e) => {
        e.preventDefault();

        const newSeason = {
            _id: seasonId,
            name: seasonName,
            competition_id: +localStorage.getItem("clicked_competition")
        }
        axios.post('http://localhost:4000/app/newSeason', newSeason)
            .then(() => {
                setSeasonName('');
                setSeasonId('');
                renderSeasons(+localStorage.getItem("clicked_competition"));
            })
            .then(() => alert("The Season has been successfully created!"));
    }

    const renderSeasons = (e) => {
        axios.get(`http://localhost:4000/app/getSeasons/${e}`)
            .then(res => res.data)
            .then(res => {
                for(let i = 0; i < res.length; i++) {
                    seasons[i] = {
                        "value": res[i].name,
                        "label": res[i].name,
                        "id": res[i]._id
                     }
                };
                setSeasons(seasons);
                
            })
    };

    useEffect(() => {
        axios.get('http://localhost:4000/app/getSeasons')
            .then(res => res.data)
            .then(res => {
                 for(let i = 0; i < res.length; i++) {
                    seasonsIds[i] = res[i]._id
                };
                setSeasonsIds(seasonsIds);
            });
    }, [seasonsIds])

    useEffect(() => {
        if(seasonsIds.includes(+seasonId)) {
            setMessage("This Season id already exists. Please choose another Season id.");
        } else {
            setMessage("");
        }
    }, [seasonId, seasonsIds]);

    return(
        <div>
            <div>
                <button className = "open_button" onClick = {() => setChanged(!changed)}>
                    Would you like to create a new Season?
                </button>
            </div>
            <div style = {{display: changed ? "block" : "none"}}>
                <div className = "createHeader">
                    <h1>Create a new Season</h1>
                </div>
                <p style = {{margin: '0'}}>Please be sure that <i><b>the Competition is chosen</b></i> before you start creating a new Season.</p>
                <Select
                    placeholder = "Which Competition does a new Season belong to?"
                    onChange = {(e) => {
                        renderSeasons(e.id);
                        localStorage.setItem("clicked_competition", e.id);
                        setIsCompetitionInStorage(true);
                        localStorage.removeItem("clicked_season");
                    }}
                    options = {competitions}
                    onMenuOpen = {() => {
                        setSeasons([])
                    }}
                />
                <div className = "formPlusMessageContainer">
                    <form className = "creationForm">
                        <div className = "input_container">
                            <label htmlFor = "enterSeasonId">
                                <span className = "star">*</span>Season id:
                            </label>
                            <input
                                id = "enterSeasonId"
                                type = "number"
                                value = {seasonId}
                                placeholder = "Enter a Season id"
                                autoComplete = "off"
                                onChange = {(e) => changeSeasonId(e)}>
                            </input>
                        </div>
                        <div className = "input_container">
                            <label htmlFor = "enterSeasonName">
                                <span className = "star">*</span>Season name:
                            </label>
                            <input
                                id = "enterSeasonName"
                                type = "text"
                                value = {seasonName}
                                placeholder = "Enter a Season name"
                                autoComplete = "off"
                                onChange = {(e) => changeSeasonName(e)}>
                            </input>
                        </div>
                        <button
                            className = "submit_button"
                            disabled = {seasonId && seasonName && isCompetitionInStorage && !seasonsIds.includes(+seasonId) ? false : true}
                            onClick = {(e) => onClick(e)}>Create a new Season</button>
                    </form>
                    <div className = "message_container" style ={message ? {border: '2px solid #FF0000'} : {border: '2px solid #00FF00'}}>
                        <Message message = {message}/>
                    </div>
                </div>
                <div>
                    <MatchForm
                        seasons = {seasons}
                        isCompetitionInStorage = {isCompetitionInStorage} />
                </div>
            </div>
        </div>
    )
}

export default SeasonForm;