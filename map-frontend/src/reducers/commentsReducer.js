import {
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_PENDING,
    FETCH_NEW_COMMET_SUCCESS
} from '../constants/comments';

const initialState = {
    comments:[],
    pending: false,
    error: null
}

const commentsReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_COMMENTS_PENDING:
            return {
                ...state,
                pending: true,
                error:null
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                pending: false,
                comments: action.payload,
                error:null
            }
        case FETCH_COMMENTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        case FETCH_NEW_COMMET_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                comments: [...state.comments, action.payload]
            }
        default:
            return state
    }

}

export default commentsReducer;