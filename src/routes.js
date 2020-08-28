import React from 'react';
import {Switch, Route} from 'react-router-dom'

//Components

export default (
    <Switch>
        <Route component={Auth} exact path="/" />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={Settings} path="/settings" />
    </Switch>
);