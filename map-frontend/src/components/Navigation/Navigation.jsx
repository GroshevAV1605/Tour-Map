import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchCategories} from '../../actions/categories';
import styles from './Navigation.module.css';
import CategoryButton from '../CategoryButton/CategoryButton';

const Navigation = (props) => {

    useEffect(() => {
        props.fetchCategories();
    }, [])

    const {categories} = props;
    
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

const mapStateToProps = store => ({
    categories: store.categoriesReducer.categories,
})

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);