import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get_all_events } from '../redux/actions/eventsActions';
import store from '../redux/store';
import axios from 'axios';
// Socket IO Import
import openSocket from 'socket.io-client';
// Socket IO Path
const socket = openSocket('http://192.168.100.100:8000');

function EventCard() {

    const dispatch = useDispatch();   
    const reduxState = store.getState();
    const userInfo = {...reduxState.reduxUser};
 
    // State Hooks for Events
    const [allEvents, setAllEvents] = useState([]);
    const [displayEventId, setDisplayEventId] = useState(0);
    const [displayEvent, setDisplayEvent] = useState({});
    const [newEventFlash, setNewEventFlash] = useState(false);
    const [cycleFlash, setCycleFlash] = useState(false);

    // State Hooks for Image
    const [liveToggle, setLiveToggle] = useState(false);
    
    // const eventClassList = ["Nothing/Clear", "Person", "Vehicle", "Plant", "Other",
    //                             "Person + Vehicle", "Person + Plant", "Vehicle + Plant",
    //                             "Person + Vehicle + Plant" ];
    // const eventCatList = ["No Alarm", "Verified-Alarm", "Nuisance-Alarm", "False-Alarm"]

    // const [userSelectedClass, setUserSelectedClass] = useState(eventClassList[0]);
    // const [userSelectedCat, setUserSelectedCat] = useState(eventCatList[0]);
    
    const [classButtonState, setClassButtonState] = useState( { person: false, vehicle: false, plant: false, other: false } );
    const [catButtonState, setCatButtonState] = useState( { alarm: false, nuisance: false, false: false } );
    
    const [userNotes, setUserNotes] = useState( "No Notes" );

    useEffect( () => {
        getAllEvents();
        connectToSocket();
    }, [])
    
    const connectToSocket = () => {
        console.log('Connecting to Socket');
        socket.emit('test');
        socket.on('backTest', () => {
          console.log('Socket Test Success');
        })
        socket.on('newEventClient', (message) => {
          console.log(message);
          getAllEvents();
          handleNewEventFlash();
        })
      }

      
    const handleNewEventFlash = () => {
        setNewEventFlash(true);
        setTimeout( () => {
            setNewEventFlash(false);
        }, 750);
    }

    const handleCycleFlash = () => {
        setCycleFlash(true);
        setTimeout( () => {
            setCycleFlash(false);
        }, 250);
    }


    const getAllEvents = () => {
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
        if ( displayEventId >= allEvents.length - 2 ) {
            setDisplayEventId(0);
        } else {
            if (displayEventId === 0) {
                getAllEvents();
                setDisplayEventId(0);
                console.log("Trying to force update")
            } else {
            setDisplayEventId(displayEventId - 1);
            setDisplayEvent(allEvents[displayEventId]);
            }
        }
        console.log("EC displayEventID UP End: ", displayEventId);
        handleCycleFlash();
    }

    const handleChangeEventDown = () => {
        setDisplayEventId(displayEventId + 1);
        setDisplayEvent(allEvents[displayEventId]);
        handleCycleFlash();
    }

    const concatUserClass = (obj) => {
        let result = '';
        for ( const property in obj ) {
          if (obj[property] === true ) {
            if (!result) { result = result.concat(property) } 
                else { result = result.concat(" + ",property); }
          } 
        }
        return result;
    }

    const concatUserCat = (obj) => {
        let result = '';
        for ( const property in obj ) {
            if (obj[property] === true ) {
              result = property;
            } 
          }
          return result;
    }

    const handleSave = (andNext) => {
        console.log('Saving User Input');
        const userClass = concatUserClass(classButtonState);
        const userCat = concatUserCat(catButtonState);
        axios
            .put(`/api/event/${displayEvent.event_id}`, 
                [ displayEvent.event_id,
                     userInfo.user_id, 
                     userClass, 
                     userCat, 
                     userNotes ] )
            .catch( err => console.log( 'Error Editing Event: ', err ) );
        if (andNext) {
            clearEntries();
            handleChangeEventDown();
        }
    }

    const clearEntries = () => {
        setClassButtonState( { person: false, vehicle: false, plant: false, other: false } );
        setCatButtonState( { alarm: false, nuisance: false, false: false } );
        setUserNotes( "No Notes" );
    }


    return(
        <div className={`EventCard`}>
            <img className="eventcard-arrows" src="./media/triangle-up.png" alt="up arrow"
                onClick={ () => handleChangeEventUp() } 
            /> 
            <div className={`eventcard-main ${newEventFlash ? "ec-flash-event" : null } ${cycleFlash ? "ec-flash-cycle" : null }`}>
                <div className="eventcard-image-container">
                    <div className="eventcard-image-timestamp-container">
                        <h3 className="eventcard-image-timestamp">{displayEvent.timestamp}</h3>        
                    </div>
                    <img className="eventcard-image" 
                        src={ liveToggle ? displayEvent.vid_live_mpjpeg : displayEvent.rec_img_url} alt="#"
                        onClick={ liveToggle ? () => window.open(displayEvent.vid_live_mpjpeg) : () => window.open(displayEvent.rec_img_url) }    
                    />
                    <div className="eventcard-image-button-container">
                        <button 
                            className={ liveToggle ? "eventcard-button" : "eventcard-button button-selected"}
                            onClick={() => setLiveToggle(false) }
                            >Event Image</button>
                        <button 
                            className={ liveToggle ? "eventcard-button button-selected" : "eventcard-button"}
                            onClick={() => setLiveToggle(true) }
                            >Live .mpjpeg</button>
                    </div>
                </div>
                <div className="eventcard-data-container">
                    <div className="eventcard-source-container">
                        <div className="eventcard-source-info-container">
                            <h3 className="eventcard-source-label">Status:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.status}</h3>
                            <h3 className="eventcard-source-label">Camera Name:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.name}</h3>
                            <h3 className="eventcard-source-label">Site / Location:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.site}</h3>
                            <h3 className="eventcard-source-label">Analytics Type:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.analytics_type}</h3>
                            <h3 className="eventcard-source-label">Classified As:</h3>
                            <h3 className="eventcard-eventData">{displayEvent.src_class}</h3>                        
                        </div>
                        <div className="eventcard-source-right-container">
                            <div className="eventcard-eventId-container">
                                <h3 className="eventcard-label">ID:</h3>
                                <h3 className="eventcard-eventData">{displayEvent.event_id}</h3> 
                            </div>
                            <button className="button eventcard-button" onClick={ () => window.open(displayEvent.vid_live_webm)} >Live .webm</button>                           
                            <button className="button eventcard-button" onClick={ () => window.open(displayEvent.vid_live_mpjpeg)} >Live .mpjpeg</button>                           
                            <button className="button eventcard-button" onClick={ () => window.open(displayEvent.vid_rec_webm)} >Rec .webm</button>                           
                            <button className="button eventcard-button" onClick={ () => window.open(displayEvent.vid_rec_mpjpeg)} >Rec .mpjpeg</button>                           
                        </div>
                    </div>

                    <div className="eventcard-userInput-container">
                        <div className="eventcard-userInput-info-container">
                            <h3 className="eventcard-userInput-label">Object Classification:</h3>
                            <div className="eventcard-userInput-selectIcon">
                                <div className="eventcard-icon-container">
                                    <img className={classButtonState.person ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                        onClick={ () => classButtonState.person ? setClassButtonState( { ...classButtonState, person: false} ) : setClassButtonState( { ...classButtonState, person: true} ) } 
                                        src="./media/directions_walk-white-48dp.svg" alt="#"/>
                                    <p className="eventcard-icon-label">person</p>
                                </div>
                                <div className="eventcard-icon-container">
                                    <img className={classButtonState.vehicle ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                        onClick={ () => classButtonState.vehicle ? setClassButtonState( { ...classButtonState, vehicle: false} ) : setClassButtonState( { ...classButtonState, vehicle: true} ) } 
                                        src="./media/directions_car-white-48dp.svg" alt="#"/>
                                    <p className="eventcard-icon-label">vehicle</p>
                                </div>
                                <div className="eventcard-icon-container">
                                    <img className={classButtonState.plant ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                        onClick={ () => classButtonState.plant ? setClassButtonState( { ...classButtonState, plant: false} ) : setClassButtonState( { ...classButtonState, plant: true} ) } 
                                        src="./media/nature-white-48dp.svg" alt="#"/>
                                    <p className="eventcard-icon-label">plant</p>
                                </div>
                                <button className="button eventcard-button"
                                    onClick={ () => classButtonState.other ? setClassButtonState( { ...classButtonState, other: false} ) : setClassButtonState( { ...classButtonState, other: true} ) } 
                                >Other</button>
                            </div>
                            <h3 className="eventcard-userInput-label">Alarm Category:</h3>
                            <div className="eventcard-userInput-selectIcon">
                                
                                <div className="eventcard-icon-container">
                                    <img className={catButtonState.alarm ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => catButtonState.alarm ? 
                                                setCatButtonState( { alarm: false, nuisance: false, false:false } ) : setCatButtonState( { alarm: true, nuisance: false, false: false } )  } 
                                            src="./media/notifications_active-white-48dp.svg" alt="#"/>
                                        <p className="eventcard-icon-label">alarm</p>
                                </div>
                                <div className="eventcard-icon-container">
                                    <img className={catButtonState.nuisance ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => catButtonState.nuisance ? 
                                                setCatButtonState( { alarm: false, nuisance: false, false: false } ) : setCatButtonState( { alarm: false, nuisance: true, false: false } )  } 
                                            src="./media/notifications_none-white-48dp.svg" alt="#"/>
                                        <p className="eventcard-icon-label">nuisance</p>
                                </div>
                                <div className="eventcard-icon-container">
                                    <img className={catButtonState.false ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                                            onClick={ () => catButtonState.false ? 
                                                setCatButtonState( { alarm: false, nuisance: false, false:false } ) : setCatButtonState( { alarm: false, nuisance: false, false: true } )  } 
                                            src="./media/notifications_off-white-48dp.svg" alt="#"/>
                                    <p className="eventcard-icon-label">false</p>
                                </div>
                                <button className="button eventcard-button">Add Note</button>
                            </div>
                        </div> 
                        <div className="eventcard-userInput-button-container">
                            <button className="button eventcard-button" onClick={ () => handleSave(false) } >Save</button> 
                            <button className="button eventcard-button" onClick={ () => handleSave(true) } >Save & Next</button> 
                        </div>
                    </div>
                </div>
            </div>
            { displayEventId >= allEvents.length ? <div className="eventcard-arrows"></div> : 
            <img className="eventcard-arrows" src="./media/triangle-down.png" alt="down arrow"
                onClick={ () => handleChangeEventDown() } 
            /> }
        </div>
    );
}

export default EventCard;