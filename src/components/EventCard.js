import React, { useState } from 'react';


function EventCard() {
    const [eventImage, setEventImage] = useState("");

    let tempImg = "http://localhost:7001/ec2/cameraThumbnail?cameraId=998dbc71-6d2f-409e-4af2-d2784eafd726"
    
    return(
        <div className="EventCard">
            <div className="eventcard-image-container">
                <img className="eventcard-image" src={eventImage} alt="#" />
            </div>
            <div className="eventcard-info-container">
                <button onClick={ () => setEventImage(tempImg) } >Set Img</button>
            </div>
        </div>
    );
}

export default EventCard;