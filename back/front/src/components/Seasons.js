import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select';
import Matches from './Matches';

const Seasons = ({seasons, defaultSeasonValue, changed, default_id}) => {
    const [matches, setMatches] = useState([]);
    
    const renderMatches = (e) => {
        axios.get(`http://localhost:4000/app/getMatches/${e.id}`)
            .then(res => res.data)
            .then(res => setMatches(res))
    };

    useEffect(() => {
        if(defaultSeasonValue.id || defaultSeasonValue.id === 0) {
            axios.get(`http://localhost:4000/app/getMatches/${defaultSeasonValue.id}`)
            .then(res => res.data)
            .then(res => setMatches(res))
        }
    }, [defaultSeasonValue])
        

    if(seasons.length > 0 && changed) {
        
        return (
        <div>
            <b>The Season:</b>
            <Select
                className = "select"
                defaultValue = {defaultSeasonValue}
                onChange = {(e) => renderMatches(e)}
                options = {seasons}
            />
            <Matches matches = {matches}/>
        </div>
    )};
    return (<></>)
};

export default Seasons;