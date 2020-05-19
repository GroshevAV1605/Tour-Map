import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchCategories from '../../actions/categories';

import styles from './Navigation.module.css';
import CategoryButton from '../CategoryButton/CategoryButton';

const Navigation = (props) => {

    useEffect(() => {
        props.actions.fetchCategories();
    }, [])


    const {categories, pending, error} = props;
        
    return (
        <div className={styles.navLinks}>
            {categories.map((category, i) => (
                <CategoryButton
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.categoriesReducer.error,
    categories: state.categoriesReducer.categories,
    pending: state.categoriesReducer.pending
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCategories: fetchCategories
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);