import axios from 'axios';

import {
    FETCH_USER_MARKERS_SUCCESS, 
    FETCH_MARKERS_SUCCESS, 
    FETCH_MARKERS_ERROR, 
    FETCH_MARKERS_PENDING
} from '../constants/markers';

export const fetchUserMarkersSuccess = userMarkers => ({
    type: FETCH_USER_MARKERS_SUCCESS,
    payload: userMarkers
})

export const fetchMarkersSuccess = markers => ({
    type: FETCH_MARKERS_SUCCESS,
    payload: markers
})

export const fetchMarkersPending = () => ({
    type: FETCH_MARKERS_PENDING
})

export const fetchMarkersError = () => ({
    type: FETCH_MARKERS_ERROR
})

export const fetchUserMarkers = userId => {
    return dispatch => {
        dispatch(fetchMarkersPending());
        axios.get("http://localhost:5000/markers/userMarkers/" + userId)
            .then(res => {
                let userMarker = res.data;
                dispatch(fetchUserMarkersSuccess(userMarker));
            })
            .catch(err => {
                dispatch(fetchMarkersError());
            })
    }
}