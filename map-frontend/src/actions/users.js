import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST} from '../constants/users';
import {AUTH_SUCCESS, AUTH_STAYON, AUTH_LOGOUT, AUTH_ERROR, AUTH_PENDING} from '../constants/users';
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

export const authPending = () => ({
    type: AUTH_PENDING
})

export const authError = () => ({
    type: AUTH_ERROR
})

export const register = user => {
    
    return dispatch => {
        
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
                if(user.stayOn){
                    localStorage.setItem('user', JSON.stringify(retUser.data.id));
                }
                dispatch(authSuccess(retUser.data))
                history.push('/map');
            })
            .catch(error => {
                if (error.response.status == 402){
                    dispatch(AlertError("Неверный логин или пароль"));
                }
                else{
                    dispatch(AlertError(error.toString()))
                }
                dispatch(AlertClear());
            })
    }
}

export const getById = id => {
    console.log("ID from action: " + id);
    
    authPending();
    return dispatch => {
        axios.get("http://localhost:5000/users/getById/" + id)
            .then(res => {
                let user = res.data;
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                dispatch(authError());
            })
    }
}