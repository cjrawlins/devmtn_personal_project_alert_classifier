import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function GridCard(props) {

    let eventData = props.eventInfo;

    useEffect( () => {
        updateDisplayClass();
        updateDisplayCat();
      }, [])


    const  [displayClass, setDisplayClass] = useState( { person: false, vehicle: false, plant: false, other: false } );
    const  [displayCat, setDisplayCat] = useState( { alarm: false, nuisance: false, false: false } );

    const updateDisplayClass = () => {
        let splitData = [];
        try { splitData = eventData.user_class.split(" ") 
            splitData.forEach( e => {
                switch (e) {
                    case 'person':
                        setDisplayClass( state => { 
                            return {...state, person: true } } );
                        break;
                    case 'vehicle':
                        setDisplayClass( state => { 
                            return {...state, vehicle: true } } );                    
                        break;
                    case 'plant':
                        setDisplayClass( state => { 
                            return {...state, plant: true } } );
                        break;
                    case 'other':
                        setDisplayClass( state => { 
                            return {...state, other: true } } );;
                        break;
                }
            } )
        } catch {
            //console.log(`Event ${eventData.event_id} is not yet classified`);
        } 
    }

    const updateDisplayCat = () => {
        // try { 
            switch (eventData.user_cat) {
                case 'alarm':
                    setDisplayCat( state => { 
                        return {...state, alarm: true } } );
                    break;
                case 'nuisance':
                    setDisplayCat( state => { 
                        return {...state, nuisance: true } } );                    
                    break;
                case 'false':
                    setDisplayCat( state => { 
                        return {...state, false: true } } );
                    break;
                case 'other':
                    setDisplayCat( state => { 
                        return {...state, other: true } } );;
                    break;
            }
        // } catch {
        // } 
    }


    const deleteCard = () => {
        console.log(`Deleting Card ${eventData.event_id}`)
        axios
            .delete(`/api/event/${eventData.event_id}`)
            .then( res => {
                //console.log("Event", res.data)
                props.getAllEvents();
            } ) 
    }

    return(
        <div className="GridCard">
            {/* { console.log("DispClass in JSX", displayClass) } */}
            <div className="gridcard-image-container">
                <p>{eventData.timestamp}</p>
                <img src={eventData.rec_img_url} alt="event img"
                    onClick={ () => window.open(eventData.rec_img_url)}
                />
            </div>
            <div className="gridcard-info-container">
                <div className="gridcard-info-row1">
                    <p>{`ID: ${eventData.event_id}`}</p>
                    <p onClick={() => deleteCard()} >X</p>
                </div>
                <div className="gridcard-info-row2">
                    <h1>{eventData.status}</h1>
                </div>
                <div className="gridcard-info-row3">
                    <h1>{eventData.name}</h1>
                </div>
                <div className="gridcard-info-icons">
                    <div>
                        { displayClass.person ? <img src={"./media/person.svg"} alt="#"/> : null }
                        { displayClass.vehicle ? <img src={"./media/vehicle.svg"} alt="#"/> : null }
                        { displayClass.plant ? <img src={"./media/plant.svg"} alt="#"/> : null }
                    </div>
                        { displayCat.alarm ? <img src="./media/alarm.svg" alt="#"/> : null }
                        { displayCat.nuisance ? <img src="./media/nuisance.svg" alt="#"/> : null }
                        { displayCat.false ? <img src="./media/false.svg" alt="#"/> : null }
                </div>
            </div>
        </div>
    )
}

export default GridCard;

