import {
    FETCH_MARKERS_PENDING,
    FETCH_MARKERS_SUCCESS,
    FETCH_MARKERS_ERROR,
    FETCH_USER_MARKERS_SUCCESS
} from '../constants/markers';

const initialState = {
    pending: false,
    markers: [],
    userMarkers: []
}

const markersReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_MARKERS_PENDING:
            return{
                ...state,
                pending: true
            }
        case FETCH_MARKERS_ERROR:
            return{
                ...state,
                pending: false
            }
        case FETCH_MARKERS_SUCCESS:
            return{
                ...state,
                pending:false,
                markers: action.payload
            }
        case FETCH_USER_MARKERS_SUCCESS:
            return{
                ...state,
                pending:false,
                userMarkers: action.payload
            }
        default:
            return state;
        
    }
}

export default markersReducer;
