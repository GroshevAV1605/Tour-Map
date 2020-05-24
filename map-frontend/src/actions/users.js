import {
    AUTH_SUCCESS, 
    AUTH_STAYON, 
    AUTH_LOGOUT, 
    AUTH_ERROR, 
    AUTH_PENDING, 
    USER_CHANGE_NAME,
    USER_CHANGE_AVATAR} from '../constants/users';
import {AlertClear, AlertError, AlertSuccess} from './alertActions';
import axios from 'axios';
import { history } from '../utils/history';
import { toast } from 'react-toastify';


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

export const userChangeName = (newName) => ({
    type: USER_CHANGE_NAME,
    payload: newName
})

export const userChangeAvatar = (newPhoto) => ({
    type: USER_CHANGE_AVATAR,
    payload: newPhoto
})

export const register = user => {
    
    return dispatch => {
        
        axios.post("https://tour-map-api.herokuapp.com/users", JSON.stringify(user), { headers: {'Content-Type': 'application/json'}})
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
        
        axios.post("https://tour-map-api.herokuapp.com/users/auth", JSON.stringify(user), {headers:{'Content-Type':'application/json'}})
            .then(retUser => {
                if(user.stayOn){
                    localStorage.setItem('user', JSON.stringify(retUser.data.id));
                }
                dispatch(authSuccess(retUser.data))
                history.push('/map');
            })
            .catch(error => {
                if (error.response.status === 402){
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
    authPending();
    return dispatch => {
        axios.get("https://tour-map-api.herokuapp.com/users/getById/" + id)
            .then(res => {
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                dispatch(authError());
            })
    }
}

export const changeName = (newName, id) => {
    console.log(id);
    return dispatch => {
        axios.post("https://tour-map-api.herokuapp.com/users/changeName", {newName, id})
            .then(() => {
                dispatch(userChangeName(newName));
                toast.success("Имя успешно изменено!");        
            })
            .catch(err => {
                toast.error(err.toString());
            })
    }
}

export const changeAvatar = (newPhoto, id) => {
    return dispatch => {
        
        const formData = new FormData();
        formData.append('imagefile', newPhoto);
        formData.append('id', id);
        
        axios.post("https://tour-map-api.herokuapp.com/users/changeAvatar", formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res) => {       
            dispatch(userChangeAvatar(res.data.imgSrc, id));
            toast.success("Аватар успешно изменен!");
        })
        .catch(err => {
            toast.error(err.toString());
        })
    }
    
}

