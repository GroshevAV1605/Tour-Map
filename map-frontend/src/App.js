import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from './utils/history';
import styles from './App.module.css';
import MapPage from './components/MapPage/MapPage';
import AuthPage from './components/AuthPage/AuthPage';
import PersonalArea from './components/PersonalArea/PersonalArea';
import PrivatRoute from './components/PrivatRoute/PrivatRoute';
import AddMarkerPage from './components/AddMarkerPage/AddMarkerPage';
import {authStayOn, authSuccess} from './actions/users'
import {ToastContainer} from 'react-toastify'

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
        <PrivatRoute path="/personal" Component={PersonalArea} />
        <PrivatRoute path="/marker" Component={AddMarkerPage}/>
      </Switch>
      <ToastContainer
                                position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                />
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
