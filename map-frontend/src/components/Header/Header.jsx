import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>
                <h1>Оренбург</h1>
            </div>     
            <div className={styles.header_right}>
                <NavLink className={styles.header_link} to="/map" activeClassName={styles.active_header_link}>Карта</NavLink>
                <NavLink className={styles.header_link} to='/personal' activeClassName={styles.active_header_link}>Места</NavLink>
                <NavLink className={styles.header_link} to='/marker' activeClassName={styles.active_header_link}>Добавить метку</NavLink>
                <NavLink className={styles.header_link} to="/auth" activeClassName={styles.active_header_link}>Войти</NavLink>
            </div>
        </div>
    )
}

export default Header;