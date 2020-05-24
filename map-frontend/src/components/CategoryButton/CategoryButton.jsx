import React, {useState} from 'react';

import styles from './CategoryButton.module.css';

const CategoryButton = ({category, _selectedCats, ...props}) => {

    const [isChecked, setChecked] = useState(false);

    const CategoryCheck = () => {
        let newState = !isChecked;
        setChecked(newState);
        if(newState){
            _selectedCats.setSelectedCats([..._selectedCats.selectedCats, category.id])
        }
        else{
            _selectedCats.setSelectedCats(
                _selectedCats.selectedCats.filter(m=> m!==category.id)
            );
        }
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