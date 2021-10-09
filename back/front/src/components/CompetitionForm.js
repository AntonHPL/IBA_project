import React, {useState, useEffect, useContext} from 'react';
import { Context } from './context';
import SeasonForm from './SeasonForm';
import Message from './Message';
import axios from 'axios';
import '../styles/CompetitionForm.css'

const CompetitionForm = ({competitions}) => {
    const [competitionName, setCompetitionName] = useState('');
    const [competitionsIds, setCompetitionsIds] = useState([]);
    const [competitionId, setCompetitionId] = useState('');
    const [message, setMessage] = useState('');

    const {competitionAdded, setCompetitionAdded} = useContext(Context);

    const changeCompetitionName = (e) => {
        setCompetitionName(e.target.value);
    }

    const changeCompetitionId = (e) => {
        setCompetitionId(e.target.value);
    }

    const onClick = (e) => {
        e.preventDefault();
        
        const newCompetition = {
            _id: competitionId,
            name: competitionName
        }
        axios.post('http://localhost:4000/app/newCompetition', newCompetition)
            .then(() => {
                setCompetitionId('');
                setCompetitionName('');
                setCompetitionAdded(!competitionAdded);
            })
            .then(() => alert("The Competition has been successfully created!"))
    }

    useEffect(() => {
        if(competitions) {
            for(let i = 0; i < competitions.length; i++) {
                competitionsIds[i] = competitions[i].id;
            };
    }}, [competitions, competitionsIds])

    useEffect(() => {
        if(competitionsIds.includes(+competitionId)) {
            setMessage("This Competition id already exists. Please choose another Competition id.");
        } else {
            setMessage("");
        }
    }, [competitionId, competitionsIds]);
    
    return(
        <div>
            <div className = "createHeader">
              <h1>Create a new Competition</h1>
            </div>
            <div className = "formPlusMessageContainer">
                <form className = "creationForm">
                    <div className = "input_container">
                        <label htmlFor = "enterCompetitionId">
                            <span className = "star">*</span>Competition id:
                        </label>
                        <input
                            id = "enterCompetitionId"
                            type = "number"
                            value = {competitionId}
                            placeholder = "Enter a Competition id"
                            autoComplete = "off"
                            onChange = {(e) => changeCompetitionId(e)}>
                        </input>
                    </div>
                    <div className = "input_container">
                        <label htmlFor = "enterCompetitionName">
                            <span className = "star">*</span>Competition name:
                        </label>
                        <input
                            id = "enterCompetitionName"
                            type = "text"
                            value = {competitionName}
                            placeholder = "Enter a Competition name"
                            autoComplete = "off"
                            onChange = {(e) => changeCompetitionName(e)}>
                        </input>
                    </div>
                    <button
                        className = "submit_button"
                        disabled = {competitionId && competitionName && !competitionsIds.includes(+competitionId) ? false : true}
                        onClick = {(e) => onClick(e)}>
                            Create a new Competition
                    </button>
                </form>
                <div className = "message_container" style ={message ? {border: '2px solid #FF0000'} : {border: '2px solid #00FF00'}}>
                    <Message message = {message}/>
                </div>
            </div>
            <div>
                <SeasonForm competitions = {competitions} />
            </div>
        </div>
    )
    
}

export default CompetitionForm;