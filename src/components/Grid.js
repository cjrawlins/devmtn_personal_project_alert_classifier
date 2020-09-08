import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_events } from '../redux/actions/eventsActions';
import { get_user } from '../redux/actions/userActions';
import store from '../redux/store';
import axios from 'axios';

//Components
import GridCard from './GridCard';

//CSS Sass


function Grid() {

    const dispatch = useDispatch();

    let [allEvents, setAllEvents] = useState([]);

    useEffect( () => {
        getAllEvents();
        getUserSession();
    }, [])
    
    const getAllEvents = () => {
        console.log("Getting All Events")
        axios
            .get('/api/events/all')
            .then( res => {
                dispatch( get_all_events( res.data ) )
                setAllEvents(res.data);  
            } )     
    }

    const getUserSession = () => {
        console.log("---Updating User Session")
        axios
            .get('/auth/getuser')
            .then( res => {
                console.log("Grid Update User", res.data)
                dispatch( get_user() )
            } )   
    }
    
    let gridMap = allEvents.map( function(curr, index) {
        return(
            <GridCard
                key = {index}
                eventInfo = {curr}
                getAllEvents = {getAllEvents}
            />
        )
    } ) 

    return(

        <div className="Grid">
            {/* <GridCard/> */}
            {/* <EventCard/> */}
            {gridMap}
        </div>
    );

}

export default Grid;