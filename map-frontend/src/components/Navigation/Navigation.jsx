import React, { useEffect } from 'react';
import styles from './Navigation.module.css';
import CategoryButton from '../CategoryButton/CategoryButton';

const Navigation = (props) => {

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

export default Navigation;