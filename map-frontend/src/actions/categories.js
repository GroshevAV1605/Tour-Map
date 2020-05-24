import {FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_PENDING, FETCH_CATEGORIES_SUCCESS} from '../constants/categories';
import axios from 'axios';

const fetchCategoriesPending = () => ({
    type: FETCH_CATEGORIES_PENDING
});

const fetchCategoruiesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories    
});

const fetchCategoriesError = (error) => ({
    type: FETCH_CATEGORIES_ERROR,
    payload: error
});

export const fetchCategories = () => {
    
    return dispatch => {
        dispatch(fetchCategoriesPending());
        axios.get("https://tour-map-api.herokuapp.com/categories")
            .then(res => {
                console.log(res);
                if(res.error){
                    throw(res.error);
                }
                let categories = res.data.map(cat => ({...cat, name: cat.name.trim()}))
                dispatch(fetchCategoruiesSuccess(categories))
            })
            .catch(error => {
                dispatch(fetchCategoriesError(error));
            })
    }
}

