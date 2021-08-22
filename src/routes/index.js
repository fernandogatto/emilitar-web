import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import * as Modules from './modules';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    component={Modules.SignIn}
                    exact
                />

                <Route
                    path="/criar-conta"
                    component={Modules.SignUp}
                    exact
                />

                <Route
                    path="/status-do-alistamento"
                    component={Modules.Status}
                    exact
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
