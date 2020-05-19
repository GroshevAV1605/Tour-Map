import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import usersReducer from './usersReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    categoriesReducer,
    usersReducer,
    alertReducer
})