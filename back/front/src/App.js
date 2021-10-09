import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Competitions from './components/Competitions';
import CompetitionForm from './components/CompetitionForm';
import Navigation from './components/Navigation';
import Plug from "./components/Plug";
import './styles/App.css'
import { Context } from './components/context';
 
const App = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [competitionAdded, setCompetitionAdded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/app/getCompetitions')
      .then(res => res.data)
      .then(res => {
        for(let i = 0; i < res.length; i++) {
          competitions[i] = {
            "value": res[i].name,
            "label": res[i].name,
            "id": res[i]._id
          }
        };
        setCompetitions(competitions);
      })
      .then(() => {
        setLoaded(true);
      })
  }, [competitions, competitionAdded]);

  if(competitions.length > 0 && loaded) {
    return (
      <Context.Provider value = {{competitionAdded, setCompetitionAdded, show, setShow}}>
        <div className = "container">
          <Router>
            <div className = "sidebar">
              <Navigation />
            </div>
            <div className = "content">
              <Switch>
                <Route exact path = "/">
                  <Competitions
                    competitions = {competitions}
                  />
                  <div style = {{display: show ? "block" : "none"}}>
                    <Plug />
                  </div>
                </Route>
                <Route exact path = "/Form">
                  <CompetitionForm
                    competitions = {competitions} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </Context.Provider>
    )
  }
  return (<></>)
};

export default App;
