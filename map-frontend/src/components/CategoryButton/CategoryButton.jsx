import React, {useState} from 'react';

import styles from './CategoryButton.module.css';

const CategoryButton = ({category}) => {

    const [isChecked, setChecked] = useState(false);

    const CategoryCheck = () => {
        let newState = !isChecked;
        setChecked(newState);
    }

    return (
        <button
            className={`${styles.category_btn} ${isChecked ? styles.checked : ""}`}
            style={{ "--color": category.color }}
            onClick={CategoryCheck}
        >
            {category.title}
        </button>
    )
}

export default CategoryButton;