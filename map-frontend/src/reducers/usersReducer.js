import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    AUTH_SUCCESS,
    AUTH_STAYON,
    AUTH_LOGOUT
} from '../constants/users';



const usersReducer = (state={user:""}, action) => {
    switch(action.type){
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case AUTH_STAYON:
            return {
                ...state,
                stayOn: action.payload
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                user:"",
            }
        default:
            return state;
    }
}

export default usersReducer;