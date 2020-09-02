import React, { useState } from 'react';


function EventCard(props) {
    const [eventImage, setEventImage] = useState("");
    const [selectedClass, setSelectedClass] = useState( { person:  false, vehicle: false, tree: false } );
    const [selectedCat, setSelectedCat] = useState( { alarm:  false, nuisance: false, false: false } );

    //Temp to mockup
    let eventId = '123456';

    let tempImg = "http://localhost:7001/ec2/cameraThumbnail?cameraId=998dbc71-6d2f-409e-4af2-d2784eafd726"

    const nxEventImage = `http://localhost:7001/ec2/cameraThumbnail?cameraId=${props.eventInfo.event_cameraid}`

    return(
        <div className="EventCard">
            <div className="eventcard-image-container">
                <img className="eventcard-image" src={props.eventInfo.img_url} alt="#" />
            </div>
            <div className="eventcard-data-container">
                <div className="eventcard-label-container">
                    <h3 className="eventcard-label">Status:</h3>
                    <h3 className="eventcard-label">{`Event ID: ${props.eventInfo.event_id}`}</h3>
                </div>
                <div className="eventcard-info-container">
                    <h1>NEW</h1>
                </div>
                <div className="eventcard-label-container">
                    <h3 className="eventcard-label">Source:</h3>
                </div>
                <div className="eventcard-info-container">
                    <h1>NW Building</h1>
                    <button className="button eventcard-button" 
                        onClick={ () => setEventImage(nxEventImage)}
                    >Source Info</button>
                </div>
                <div className="eventcard-label-container">
                <h3 className="eventcard-label">Object Classification:</h3>
                </div>
                <div className="eventcard-input-container">
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
                    
                </div>
                <div className="eventcard-label-container">
                <h3 className="eventcard-label">Alarm Category:</h3>
                </div>
                <div className="eventcard-input-container">

                <div className="eventcard-icon-container">
                        <img className={selectedCat.alarm ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                            onClick={ () => setSelectedCat( {
                                ...selectedCat, 
                                alarm:  true,
                                nuisance: false,
                                false:    false
                            } ) } 
                            src="./media/notifications_active-white-48dp.svg" alt="#"/>
                        <p className="eventcard-icon-label">alarm</p>
                    </div>
                    <div className="eventcard-icon-container">
                        <img className={selectedCat.nuisance ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                            onClick={ () => setSelectedCat( {
                                ...selectedCat, 
                                alarm:  false,
                                nuisance: true,
                                false:    false
                            } ) } 
                            src="./media/notifications_none-white-48dp.svg" alt="#"/>
                        <p className="eventcard-icon-label">nuisance</p>
                    </div>
                    <div className="eventcard-icon-container">
                        <img className={selectedCat.false ? "eventcard-icon-image-selected" : "eventcard-icon-image"}
                            onClick={ () => setSelectedCat( {
                                ...selectedCat, 
                                alarm:  false,
                                nuisance: false,
                                false:    true
                            } ) } 
                            src="./media/notifications_off-white-48dp.svg" alt="#"/>
                        <p className="eventcard-icon-label">false</p>
                    </div>
                </div>

                <div className="eventcard-bottom-container">
                        <button className="button eventcard-button">Add Note</button>
                        <label><input type="checkbox" id="partBlocked" name="partBlocked"/>{" Partially Blocked"}</label>
                </div>

            </div>
        </div>
    );
}

export default EventCard;