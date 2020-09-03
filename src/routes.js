import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Auth from './components/Auth';
import EventCard from './components/EventCard';
import Grid from './components/Grid';
import Settings from './components/Settings';

export default (
    <Switch>
        <Route component={Auth} exact path="/" />
        <Route component={EventCard} path="/events" />
        <Route component={Grid} path="/grid" />
        <Route component={Settings} path="/settings" />
    </Switch>
);