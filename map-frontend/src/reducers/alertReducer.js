import {ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS} from '../constants/alert';

const initialState = {
    error: '',
    success: ''
}

const alertReducer = (state=initialState, action) => {
    switch(action.type) {
        case ALERT_SUCCESS:
            return {
                ...state,
                success: action.payload,
                error: ''
            }

        case ALERT_ERROR:
            return {
                ...state,
                error: action.payload,
                success: ''
            }

        case ALERT_CLEAR:
            return {
                ...state,
                error: '',
                success: ''
            }

        default:
            return state
    }
}

export default alertReducer;