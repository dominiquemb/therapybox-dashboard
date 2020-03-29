import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropsRoute from "../../shared/components/PropsRoute";
import authenticationService from '../services/authentication.service';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return React.createElement(component, finalProps);
  };

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        // return <Component {...props} />
        return renderMergedProps(Component, props, rest);
    }} />
);

export default PrivateRoute;