import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginContext from '../../../contextes/LoginContext';


const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(LoginContext);

    return isAuthenticated ? (<Route path={path} exact component={component} />) : (<Redirect to="login" />)
};

export default PrivateRoute;