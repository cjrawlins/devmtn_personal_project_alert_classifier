import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_events } from '../redux/actions/eventsActions';
import store from '../redux/store';
import axios from 'axios';
//import {Link} from 'react-router-dom';



function EventCard(props) {

    const dispatch = useDispatch();    

    const [displayEventId, setDisplayEventId] = useState(0);
    const [displayEvent, setDisplayEvent] = useState({});

    

    //const [eventImage, setEventImage] = useState("");
    const [selectedClass, setSelectedClass] = useState( { person:  false, vehicle: false, tree: false } );
    const [selectedCat, setSelectedCat] = useState( { alarm:  false, nuisance: false, false: false } );

    let [allEvents, setAllEvents] = useState([]);
    
    useEffect( () => {
        getAllEvents();
    }, [])
    
    

    const getAllEvents = (props) => {
        console.log("Getting All Events")
        axios
            .get('/api/events/all')
            .then( res => {
                dispatch( get_all_events( res.data ) )
                setAllEvents(res.data);
                setDisplayEvent(res.data[0])
            } );
    }

    const handleChangeEventUp = () => {
        if (displayEventId === 0) {
            getAllEvents();
            setDisplayEventId(0);
            console.log("Trying to force update")

        } else {
        setDisplayEventId(displayEventId - 1);
        setDisplayEvent(allEvents[displayEventId]);
        }
    }

    const handleChangeEventDown = () => {
        setDisplayEventId(displayEventId + 1);
        setDisplayEvent(allEvents[displayEventId]);
    }

    return(
        <div className="EventCard">
            {/* { displayEventId === 0 ? <div className="eventcard-arrows"></div> :  */}
            <img className="eventcard-arrows" src="./media/triangle-up.png"  
                onClick={ () => handleChangeEventUp() } 
            /> 
            <div className="eventcard-main">
                <div className="eventcard-image-container">
                    <img className="eventcard-image" src={displayEvent.img_url} alt="#"/>
                </div>
                <div className="eventcard-data-container">
                    <div className="eventcard-source-container">
                        <div className="eventcard-source-info-container">
                            <h3 className="eventcard-label">Status:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.status}</h3>
                            <h3 className="eventcard-label">Date / Time:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.date_time}</h3>
                            <h3 className="eventcard-label">Camera Name:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.name}</h3>
                            <h3 className="eventcard-label">Site / Location:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.site}</h3>
                            <h3 className="eventcard-label">Analytics Type:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.analytics_type}</h3>
                            <h3 className="eventcard-label">Classified As:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.src_class}</h3>                        
                        </div>
                        <div className="eventcard-source-right-container">
                            <div className="eventcard-eventId-container">
                                <h3 className="eventcard-label">ID:</h3>
                                <h3 className="eventcard-eventData">{displayEvent.event_id}</h3> 
                            </div>
                            <button className="button eventcard-button">Source Info:</button>
                            <button className="button eventcard-button">View Live</button>                           
                        </div>
                    </div>
                    <div className="eventcard-userInput-container">
                        <div className="eventcard-userInput-info-container">
                            <h3 className="eventcard-label">Object Classification:</h3>
                            <div className="eventcard-userInput-selectIcon">
                                    <div className="eventcard-icon-container">
                                        <img className={selectedClass.person ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => setSelectedClass( {
                                                ...selectedClass, 
                                                person:  true,
                                                vehicle: false,
                                                tree:    false
                                            } ) } 
                                            src="./media/directions_walk-white-48dp.svg" alt="#"/>
                                        <p className="eventcard-icon-label">person</p>
                                    </div>
                                    <div className="eventcard-icon-container">
                                        <img className={selectedClass.vehicle ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => setSelectedClass( {
                                                ...selectedClass, 
                                                person:  false,
                                                vehicle: true,
                                                tree:    false
                                            } ) } 
                                            src="./media/directions_car-white-48dp.svg" alt="#"/>
                                        <p className="eventcard-icon-label">vehicle</p>
                                    </div>
                                    <div className="eventcard-icon-container">
                                        <img className={selectedClass.tree ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => setSelectedClass( {
                                                ...selectedClass, 
                                                person:  false,
                                                vehicle: false,
                                                tree:    true
                                            } ) } 
                                            src="./media/nature-white-48dp.svg" alt="#"/>
                                        <p className="eventcard-icon-label">tree</p>
                                    </div>
                                    <button className="button eventcard-button">Other</button>
                            </div>
                                    

                        </div> 
                        <div className="eventcard-userInput-selectIcon">

                        </div>

                        <div className="eventcard-userInput-button-container">
                            
                        </div>
                    </div>
                </div>
            </div>
            { displayEventId === allEvents.length ? <div className="eventcard-arrows"></div> : 
            <img className="eventcard-arrows" src="./media/triangle-down.png"  
                onClick={ () => handleChangeEventDown() } 
            /> }
        </div>
    );
}

export default EventCard;