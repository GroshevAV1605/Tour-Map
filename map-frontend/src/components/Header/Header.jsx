import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';
import {connect} from 'react-redux';
import {authLogOut} from '../../actions/users';
import {history} from '../../utils/history';

const Header = (props) => {

    const logOut = () => {
        props.authLogOut();
        localStorage.removeItem('user');
        history.push('/map');
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>
                <h1>Оренбург</h1>
            </div>     
            <div className={styles.header_right}>
                <NavLink className={styles.header_link} to="/map" activeClassName={styles.active_header_link}>Карта</NavLink>
                {!props.user ? (<NavLink className={styles.header_link} to="/auth" activeClassName={styles.active_header_link}>Войти</NavLink>) : (
                    <React.Fragment>
                        <NavLink className={styles.header_link} to='/marker' activeClassName={styles.active_header_link}>Добавить метку</NavLink>
                        <NavLink className={styles.header_link} to='/personal' activeClassName={styles.active_header_link}>Личный кабинет</NavLink>
                        <span className={styles.header_link} onClick={()=>logOut()} >Выйти</span>
                    </React.Fragment>
                    
                )}
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    user: store.usersReducer.user
})

const mapDispatchToProps = dispatch => ({
    authLogOut: () => dispatch(authLogOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);