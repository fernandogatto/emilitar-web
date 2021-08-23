import React from 'react';

import {
    Route,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../common/contexts/Auth';

const CustomRoute = ({ isPrivate, component: Component, ...rest }) => {
    const { accessToken } = useAuth();

    let _isPrivate = isPrivate || false;

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return _isPrivate === !!accessToken ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: _isPrivate
                                ? '/'
                                : '/status-do-alistamento',
                            state: { from: location },
                        }}
                    />
                )
            }}
        />
    );
}

export default CustomRoute;
