import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from './utils/history';
import styles from './App.module.css';
import MapPage from './components/MapPage/MapPage';
import AuthPage from './components/AuthPage/AuthPage';
import PersonalArea from './components/PersonalArea/PersonalArea';
import AddMarkerPage from './components/AddMarkerPage/AddMarkerPage';
import {authStayOn, authSuccess} from './actions/users'
import {connect} from 'react-redux';
const App = (props) => {
  
  useEffect(() => {
    if(localStorage.getItem('user') !== null){
      props.authSuccess(localStorage.getItem('user'));
      props.authStayOn(true);
    }
  }, [])

  return (
    <Router history={history}>
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

const mapStateToProps = state => ({
  user: state.usersReducer.user
})

const mapDispatchToProps = dispatch => ({
  authStayOn: (stayOn) => dispatch(authStayOn(stayOn)),
  authSuccess: (user) => dispatch(authSuccess(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
