import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivatRoute = ({Component, ...rest}) => {
    let user = localStorage.getItem('user');
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



export default PrivatRoute;