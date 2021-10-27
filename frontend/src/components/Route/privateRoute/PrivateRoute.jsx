import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginContext from '../../../contextes/LoginContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(LoginContext);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
                : <Redirect to="login" />
        )} />
    );
};

export default PrivateRoute;