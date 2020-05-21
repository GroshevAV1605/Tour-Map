import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from './utils/history';
import styles from './App.module.css';
import MapPage from './components/MapPage/MapPage';
import AuthPage from './components/AuthPage/AuthPage';
import AccountPage from './components/AccountPage/AccountPage'
import PrivatRoute from './components/PrivatRoute/PrivatRoute';
import AddMarkerPage from './components/AddMarkerPage/AddMarkerPage';
import {authStayOn, getById, authLogOut} from './actions/users'
import {ToastContainer} from 'react-toastify'

import {connect} from 'react-redux';
const App = (props) => {
  
  useEffect(() => {
    console.log(props.isAuthTryComplete);
    
    if(localStorage.getItem('user') !== null){
      if(props.getById(localStorage.getItem('user'))){
        props.authStayOn(true);
      }
      else{
        authLogOut();
      }
      
    }
  }, [])

  console.log("fromAPp: "+props.isAuthTryComplete);
  
  return (
    props.isAuthTryComplete &&(
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
        <PrivatRoute path="/personal" Component={AccountPage} />
        <PrivatRoute path="/marker" Component={AddMarkerPage}/>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>)
    
  )

}

const mapStateToProps = state => ({
  user: state.usersReducer.user,
  isAuthTryComplete: state.usersReducer.isAuthTryComplete
})

const mapDispatchToProps = dispatch => ({
  authStayOn: (stayOn) => dispatch(authStayOn(stayOn)),
  getById: (id) => dispatch(getById(id)),
  authLogOut: () => dispatch(authLogOut())

})


export default connect(mapStateToProps, mapDispatchToProps)(App);
