import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

export default (
    <Switch>
        <Route component={Auth} exact path="/" />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={Settings} path="/settings" />
    </Switch>
);