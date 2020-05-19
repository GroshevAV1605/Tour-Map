import {ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS} from '../constants/alert';

export const AlertSuccess = message => {
    return { type: ALERT_SUCCESS, payload: message}
}

export const AlertError = message => {
    return { type: ALERT_ERROR, payload: message}
}

export const AlertClear = () => {
    return { type: ALERT_CLEAR }
}