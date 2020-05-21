import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST} from '../constants/users';
import {AUTH_SUCCESS, AUTH_STAYON, AUTH_LOGOUT} from '../constants/users';
import {AlertClear, AlertError, AlertSuccess} from './alertActions';
import axios from 'axios';
import { history } from '../utils/history';


export const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    payload: user
})

export const authStayOn = (stayOn) => ({
    type: AUTH_STAYON,
    payload: stayOn
})

export const authLogOut = () => ({
    type: AUTH_LOGOUT
})

export const register = user => {
    console.log('user');
    
    return dispatch => {
        console.log(user);
        
        axios.post("http://localhost:5000/users", JSON.stringify(user), { headers: {'Content-Type': 'application/json'}})
            .then(user => {             
                dispatch(AlertSuccess("Вы успешно зарегистрировались"))
                dispatch(AlertClear());
            })
            .catch(error => {
                dispatch(AlertError(error.toString()));
                dispatch(AlertClear());
            })
    }
}

export const auth = user => {
    return dispatch => {
        
        axios.post("http://localhost:5000/users/auth", JSON.stringify(user), {headers:{'Content-Type':'application/json'}})
            .then(retUser => {
                console.log(retUser);
                if(user.stayOn){
                    localStorage.setItem('user', JSON.stringify(retUser.data.id));
                }
                dispatch(authSuccess(retUser.data.id))
                history.push('/map');
            })
            .catch(error => {
                dispatch(AlertError(error.toString()));
                dispatch(AlertClear());
            })
    }
}
