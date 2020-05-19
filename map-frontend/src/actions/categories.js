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

const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesPending());
        axios.get("http://localhost:5000/categories")
            .then(res => {
                console.log(res);
                if(res.error){
                    throw(res.error);
                }
                dispatch(fetchCategoruiesSuccess(res.data))
                return res.data;
            })
            .catch(error => {
                dispatch(fetchCategoriesError(error));
            })
    }
}

export default fetchCategories;