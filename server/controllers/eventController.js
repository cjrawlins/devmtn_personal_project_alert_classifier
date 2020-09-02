const axios = require('axios').default;

module.exports = {
    createEvent: async (req, res) => {
        console.log("Create Event Called");
        let timestamp = Date.now();
        console.log("Timestamp before: ", timestamp);
        let date_time = new Date(timestamp);
        console.log(`Timestamp: ${timestamp} / Date_time: ${date_time}`);
        const db = req.app.get('db');
        let { source_id,
            event_cameraid,  
            status, 
            analytics_type, 
            src_class,
            src_notes 
        } = req.body;
        // Create Image Link:
        const img_url = `http://localhost:7011/ec2/cameraThumbnail?cameraId=${event_cameraid}&time=${timestamp}`
        // Create Video Links:
        const startVidTimestamp = timestamp - 5000; //Starts Video 5sec before event
        const endVidTimestamp = timestamp + 15000; //Starts Video 15sec after event
        const vid_live_webm = `http://localhost:7011/media/${event_cameraid}.webm`;
        const vid_live_mpjpeg = `http://localhost:7011/media/${event_cameraid}.mpjpeg`;
        const vid_rec_webm = `http://localhost:7011/media/${event_cameraid}.webm?pos=${startVidTimestamp}&endPos=${endVidTimestamp}`;
        const vid_rec_mpjpeg = `http://localhost:7011/media/${event_cameraid}.mpjpeg?pos=${startVidTimestamp}&endPos=${endVidTimestamp}`;

        const newEvent = await db.create_event( [
            source_id,
            event_cameraid, 
            timestamp,
            date_time, 
            status, 
            analytics_type, 
            src_class,
            src_notes,
            img_url,
            vid_live_webm,
            vid_live_mpjpeg,
            vid_rec_webm,
            vid_rec_mpjpeg
        ] );
        console.log(`New Event from source_id ${source_id} @ ${timestamp}`);
        console.log("Event Info: ", newEvent);
        res.status(200).send("Event Created");
    },

    getAllEvents: async (req, res) => {
        console.log("Get All Events Called");
        const db = req.app.get('db');
        await db.get_all_events()
            .then( events => {
                res.status(200).send( events )
                //console.log( events )
            } )
            .catch( error => {
                res.status(500).send( { errorMessage: "Error Getting Posts" } );
               //console.log( error );
            } );
    },

    getEvents: async (req, res) => {
        
    },

    getEvent: async (req, res) => {
        
    },

    searchEvents: async (req, res) => {
        
    },

    updateEvent: async (req, res) => {
        console.log("Update Event Called");
        let jsTime = new Date();
        let timestamp = jsTime.toLocaleString();
        const db = req.app.get('db');
        let { source_id,  
            status, 
            analytics_type, 
            src_class,
            src_notes 
        } = req.body;
        const newEvent = await db.create_event( [
            source_id, 
            timestamp, 
            status, 
            analytics_type, 
            src_class,
            src_notes
        ] );
        console.log(`New Event from source_id ${source_id} @ ${timestamp}`);
        console.log("Event Info: ", newEvent);
        res.status(200).send("Event Created");
    },

    deleteEvent: async (req, res) => {
        
    },

    getImage: async (req, res) => {
        try {
            const URL = 'http://localhost:7001/ec2/cameraThumbnail?cameraId=998dbc71-6d2f-409e-4af2-d2784eafd726';
            const response = await axios.get(URL);
            console.log(response);
          } catch (error) {
            console.error(error);
          } 
    }

}