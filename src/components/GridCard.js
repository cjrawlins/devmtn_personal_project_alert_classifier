import React from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';


function GridCard(props) {

   let eventData = props.eventInfo;
   const dispatch = useDispatch();    


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
            <div className="gridcard-image-container">
                <p>{eventData.date_time}</p>
                <img src={eventData.img_url} alt="event img"/>
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
                <div className="gridcard-info-row4">
                    <img src={"./media/directions_walk-white-48dp.svg"} alt="#"/>
                    <img src="./media/notifications_active-white-48dp.svg" alt="#"/>
                </div>
            </div>
        </div>
    )
}

export default GridCard;

