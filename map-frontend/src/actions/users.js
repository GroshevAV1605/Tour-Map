import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST} from '../constants/users';
import {AlertClear, AlertError, AlertSuccess} from './alertActions';
import axios from 'axios';


const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});

const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
});

const registerRequest = (user) => ({
    type: REGISTER_REQUEST,
    payload: user
});

const register = user => {
    return dispatch => {
        dispatch(registerRequest(user));

        axios.post("http://localhost:5000/users", JSON.stringify(user))
            .then(user => {
                console.log('Успешная регистрация');
                console.log(user);
                
                dispatch(registerSuccess());
                dispatch(AlertSuccess("Вы успешно зарегистрировались"))
            })
            .catch(error => {
                console.log('Ошибка в регистрации');
                console.log(error);
                
                dispatch(registerFailure(error.toString()));
                dispatch(AlertError(error.toString()));
            })
    }
}

export default register;