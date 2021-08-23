import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import CustomRoute from './CustomRoute';

import * as Modules from './modules';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <CustomRoute
                    path="/"
                    component={Modules.SignIn}
                    exact
                />

                <CustomRoute
                    path="/criar-conta"
                    component={Modules.SignUp}
                    exact
                />

                <CustomRoute
                    path="/status-do-alistamento"
                    component={Modules.Status}
                    exact
                    isPrivate
                />

                <Route
                    path="/pessoas-fisicas"
                    component={Modules.PhysicalPerson}
                    exact
                />

                <Route
                    path="/pessoas-fisicas/adicionar"
                    component={Modules.CreateEditPhysicalPerson}
                    exact
                />
            </Switch>
        </Router>
    )
}

export default Routes;
