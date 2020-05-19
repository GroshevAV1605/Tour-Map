import React from 'react';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import styles from './App.module.css';
import MapPage from './components/MapPage/MapPage';
import AuthPage from './components/AuthPage/AuthPage';
import PersonalArea from './components/PersonalArea/PersonalArea';
import AddMarkerPage from './components/AddMarkerPage/AddMarkerPage';

const App = () => {
  


  return (
    <Router>
      <div>
        <Header/>
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/map"/>
        </Route>
        <Route path="/map">
            <MapPage/>
        </Route>
        <Route path="/auth">
          <AuthPage/>
        </Route>
        <Route path="/personal">
          <PersonalArea/>
        </Route>
        <Route path="/marker">
          <AddMarkerPage/>
        </Route>
      </Switch>
    </Router>
    
  )

}


export default App;
