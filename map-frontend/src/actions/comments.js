import {
    FETCH_COMMENTS_ERROR, 
    FETCH_COMMENTS_SUCCESS, 
    FETCH_COMMENTS_PENDING,
    FETCH_NEW_COMMET_SUCCESS
} from '../constants/comments';
import axios from 'axios';

export const fetchCommentsError = (err) => ({
    type: FETCH_COMMENTS_ERROR,
    payload: err
})

export const fetchCommentsPending = () => ({
    type: FETCH_COMMENTS_PENDING
})

export const fetchCommentsSuccess = (comments) => ({
    type: FETCH_COMMENTS_SUCCESS,
    payload: comments
})

export const fetchNewCommentSuccess = (comment) => ({
    type: FETCH_NEW_COMMET_SUCCESS,
    payload: comment
})

export const fetchMarkerComments = id =>{
    return dispatch => {
        dispatch(fetchCommentsPending())
        axios.get('https://tour-map-api.herokuapp.com/markers/markerComments/'+id)
            .then(res => {
                dispatch(fetchCommentsSuccess(res.data));
            })
            .catch(err => dispatch(fetchCommentsError(err)))
    }
}

export const addComment = (comment) => {
    return dispatch => {
        dispatch(fetchCommentsPending())
        axios.post('https://tour-map-api.herokuapp.com/markers/newComment', JSON.stringify(comment), {headers:{'Content-Type':'application/json'}})
            .then(res => {
                dispatch(fetchCommentsSuccess(res.data));
            })
            .catch(err => dispatch(fetchCommentsError(err)))
    }
}