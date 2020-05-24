import axios from 'axios';

import {
    FETCH_USER_MARKERS_SUCCESS, 
    FETCH_MARKERS_SUCCESS, 
    FETCH_MARKERS_ERROR, 
    FETCH_MARKERS_PENDING,
    DELETE_MARKER_SUCCESS
} from '../constants/markers';
import { toast } from 'react-toastify';

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

export const fetchMarkersError = (err) => ({
    type: FETCH_MARKERS_ERROR,
    payload: err
})

export const fetchDeleteMarker = id => ({
    type:DELETE_MARKER_SUCCESS,
    payload:id
})

export const deleteMarker = id => {
    return dispatch => {
        dispatch(fetchMarkersPending());
        axios.get("https://tour-map-api.herokuapp.com/markers/deleteMarker/" + id)
            .then(res => {
                toast.success("Метка удалено!")
                dispatch(fetchDeleteMarker(id))
            })
            .catch(err => {
                dispatch(fetchMarkersError(err));
                toast.error("Ошибка при удалении: " + err)
            })
    }
}

export const fetchUserMarkers = userId => {
    
    return dispatch => {
        dispatch(fetchMarkersPending());
        axios.get("https://tour-map-api.herokuapp.com/markers/userMarkers/" + userId)
            .then(res => {
                let userMarker = res.data;
                dispatch(fetchUserMarkersSuccess(userMarker));
            })
            .catch(err => {
                dispatch(fetchMarkersError(err));
            })
    }
}

export const fetchMapMarkers = () => {
    
    return dispatch => {
        dispatch(fetchMarkersPending());
        axios.get('https://tour-map-api.herokuapp.com/markers')
            .then(res => {
                console.log(res);
                dispatch(fetchMarkersSuccess(res.data));
            })
            .catch(err => dispatch(fetchMarkersError(err)));
    }
}