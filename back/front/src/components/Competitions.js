import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Select from 'react-select';
import Seasons from './Seasons';
import '../styles/Competitions.css';
import { Context } from './context';

const Competitions = ({competitions}) => {
    const [seasons,setSeasons] = useState([]);
    const [changed, setChanged] = useState(false);
    const [defaultSeasonValue, setDefaultSeasonValue] = useState({});
    
    const {show, setShow} = useContext(Context);

    const renderSeasons = (e) => {
        axios.get(`http://localhost:4000/app/getSeasons/${e.id}`)
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
            .then(() => {
                if(seasons.length > 0) {
                    setDefaultSeasonValue({
                        "value": seasons[seasons.length-1].value,
                        "label": seasons[seasons.length-1].label,
                        "id": seasons[seasons.length-1].id
                    })
                }
            })
    }
        useEffect(() => {
            setChanged(true);
        }, [defaultSeasonValue])
    

    return (
        <div>
            <b>The Competition:</b>
            <Select
                className = "select"
                onChange = {(e) => {
                    renderSeasons(e);
                    setShow(false);
                }}
                options = {competitions}
                placeholder = 'Please select a Competition...'
                onMenuOpen = {() => {
                    setChanged(false);
                    setSeasons([]);
                }}
            />
            <Seasons
                defaultSeasonValue={defaultSeasonValue}
                competitions = {competitions}
                seasons = {seasons}
                changed = {changed}
            />
        </div>
    );
};

export default Competitions;