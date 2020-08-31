import React from 'react';
//import { useSelector, useDispatch } from 'react-redux';

//Components
import Nav from './Nav';
import EventCard from './EventCard';
//import GridCard from './GridCard';

function Dashboard() {

    // const dispatch = useDispatch();

    // const counter = useSelector( state => state.counter );
    // const isLogged = useSelector( state => state.isLogged );

    return(
        <div className="Dashboard">
            <Nav/>
            <EventCard/>
        </div>
    );

}

export default Dashboard;