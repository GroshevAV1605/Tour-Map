import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivatRoute = ({Component, user, ...rest}) => {
    const isLoggedIn = !!user;
    return (
        <Route
            {...rest}
            render={props => 
                isLoggedIn ? (
                    <Component {...props}/>
                ): (
                    <Redirect to={{pathname:"/auth", state: {from: props.location}}} />
                )
            }
        />
    )
}

const mapStateToProps = store => ({
    user: store.usersReducer.user
})

export default connect(mapStateToProps)(PrivatRoute);