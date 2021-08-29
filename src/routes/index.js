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
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <CustomRoute
                    path="/"
                    component={Modules.SignIn}
                    exact
                />

                <CustomRoute
                    path="/status-do-alistamento"
                    component={Modules.Status}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/pessoas-fisicas"
                    component={Modules.PhysicalPerson}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/pessoas-fisicas/adicionar"
                    component={Modules.CreateEditPhysicalPerson}
                    exact
                    isPrivate
                />

                <CustomRoute
                    path="/pessoas-fisicas/editar/:id"
                    component={Modules.CreateEditPhysicalPerson}
                    exact
                    isPrivate
                />
            </Switch>
        </Router>
    )
}

export default Routes;
