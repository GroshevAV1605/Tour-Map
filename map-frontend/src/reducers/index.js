import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import usersReducer from './usersReducer';
import alertReducer from './alertReducer';
import markersReducer from './markersReducer';

export default combineReducers({
    categoriesReducer,
    usersReducer,
    alertReducer,
    markersReducer
})