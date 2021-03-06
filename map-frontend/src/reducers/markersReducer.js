import {
    FETCH_MARKERS_PENDING,
    FETCH_MARKERS_SUCCESS,
    FETCH_MARKERS_ERROR,
    FETCH_USER_MARKERS_SUCCESS,
    DELETE_MARKER_SUCCESS
} from '../constants/markers';

const initialState = {
    pending: false,
    error: null,
    markers: [],
    userMarkers: []
}

const markersReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_MARKERS_PENDING:
            return{
                ...state,
                pending: true,
                error: null
            }
        case FETCH_MARKERS_ERROR:
            return{
                ...state,
                pending: false,
                error: action.payload
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
        case DELETE_MARKER_SUCCESS:
            return{
                ...state,
                pending:false,
                markers: state.markers.filter(m => m.id !== action.payload),
                userMarkers: state.userMarkers.filter(m => m.id !== action.payload)
            }
        default:
            return state;
        
    }
}

export default markersReducer;
