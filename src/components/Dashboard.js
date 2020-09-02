import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_events } from '../redux/actions/eventsActions';
import store from '../redux/store';

//Components
import Nav from './Nav';
import EventCard from './EventCard';
import axios from 'axios';
//import GridCard from './GridCard';

function Dashboard() {

    const dispatch = useDispatch();

    const reduxState = store.getState();

    let [allEvents, setAllEvents] = useState([]);

    // let allEvents = [{
    //     "event_id":4,
    //     "source_id":1,
    //     "event_cameraid":"998dbc71-6d2f-409e-4af2-d2784eafd726",
    //     "name":"First Test Source",
    //     "site":"Test Site",
    //     "timestamp":"2020-09-01T02:42:35.000Z"
    //     ,"status":"New"
    //     ,"analytics_type":"Intrusion Detection",
    //     "src_class":"Vehicle",
    //     "src_notes":"Third Ever Created Event",
    //     "user_id":null,
    //     "username":null,
    //     "user_class":null,
    //     "user_cat":null,
    //     "user_notes":null,
    //     "img_url":null,
    //     "img_data":null}            
    //                 ];

    //const counter = useSelector( state => state.counter );
    //const isLogged = useSelector( state => state.isLogged );

    useEffect( () => {
        getAllEvents();
    }, [])
    
    const getAllEvents = () => {
        console.log("Getting All Events")
        axios
            .get('/api/events/all')
            .then( res => {
                console.log("Dash Axios res.data", res.data)
                dispatch( get_all_events( res.data ) )
                setAllEvents(res.data);  
            } )     
    }

    // !! Note: .map isn't working because it is trying to run before All Events get set

  
    // allEvents = useSelector( state => state.reduxEvents.eventsList );
    //setAllEvents( useSelector( state => state.reduxEvents.eventsList ) );
    

    // let allEvents = [{"event_id":4,"source_id":1,"event_cameraid":"998dbc71-6d2f-409e-4af2-d2784eafd726","name":"First Test Source","site":"Test Site","timestamp":"2020-09-01T02:42:35.000Z","status":"New","analytics_type":"Intrusion Detection","src_class":"Vehicle","src_notes":"Third Ever Created Event","user_id":null,"username":null,"user_class":null,"user_cat":null,"user_notes":null,"img_url":null,"img_data":null},
    //                 {"event_id":3,"source_id":1,"event_cameraid":"998dbc71-6d2f-409e-4af2-d2784eafd726","name":"First Test Source","site":"Test Site","timestamp":"2020-09-01T02:33:02.000Z","status":"New","analytics_type":"Intrusion Detection","src_class":"Person","src_notes":"Second Ever Created Event","user_id":null,"username":null,"user_class":null,"user_cat":null,"user_notes":null,"img_url":null,"img_data":null},
    //                 {"event_id":2,"source_id":1,"event_cameraid":"998dbc71-6d2f-409e-4af2-d2784eafd726","name":"First Test Source","site":"Test Site","timestamp":"2020-09-01T02:32:06.000Z","status":"New","analytics_type":"Intrusion Detection","src_class":"Person","src_notes":"First Ever Created Event","user_id":null,"username":null,"user_class":null,"user_cat":null,"user_notes":null,"img_url":null,"img_data":null}];



    
    let eventsMap = allEvents.map( function(curr, index) {
        return(
            <EventCard
                key = {index}
                eventInfo = {curr}
            />
        )
    } ) 
    console.log(allEvents);
    console.log("Store: ",store.getState());
    console.log("reduxState: ", reduxState);
    return(

        <div className="Dashboard">
            <Nav/>
            {/* <EventCard/> */}
            {eventsMap}
        </div>
    );

}

export default Dashboard;