import {
    AUTH_SUCCESS,
    AUTH_STAYON,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_PENDING,
    USER_CHANGE_NAME,
    USER_CHANGE_AVATAR
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
        case USER_CHANGE_NAME:
            return {
                ...state,
                user:{
                    ...state.user,
                    name: action.payload
                }
            }
        case  USER_CHANGE_AVATAR:
            return {
                ...state,
                user:{
                    ...state.user,
                    photo: action.payload
                }
            }
        default:
            return state;
    }
}

export default usersReducer;