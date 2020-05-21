import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    AUTH_SUCCESS,
    AUTH_STAYON,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_PENDING
} from '../constants/users';



const usersReducer = (state={user:"", isAuthTryComplete: false}, action) => {
    switch(action.type){
        case AUTH_PENDING:
            return {
                ...state,
                isAuthTryComplete: false
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthTryComplete:true,
                user: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthTryComplete: true
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