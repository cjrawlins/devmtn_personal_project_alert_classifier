
const axios = require('axios').default;

//import openSocket from 'socket.io-client';
const openSocket = require('socket.io-client');
const socket = openSocket('http://localhost:8000');



module.exports = {
    createEvent: async (req, res) => {
        console.log("Create Event Called");
        let timestamp = ( new Date() ).toLocaleString();
        let epoch_time = Date.now();
        const db = req.app.get('db');
        let { source_id,
            event_cameraid,  
            status, 
            analytics_type, 
            src_class,
            src_notes 
        } = req.body;
        // Create Image Link:
        const rec_img_url = `http://localhost:7011/ec2/cameraThumbnail?cameraId=${event_cameraid}&time=${epoch_time}`
        const rec_img_data = '';
        const live_img_url = `http://localhost:7011/ec2/cameraThumbnail?cameraId=${event_cameraid}`
        // Create Video Links:
        const startVidTimestamp = epoch_time - 5000; //Starts Video 5sec before event
        const endVidTimestamp = epoch_time + 15000; //Starts Video 15sec after event
        const vid_live_webm = `http://localhost:7011/media/${event_cameraid}.webm`;
        const vid_live_mpjpeg = `http://localhost:7011/media/${event_cameraid}.mpjpeg`;
        const vid_rec_webm = `http://localhost:7011/media/${event_cameraid}.webm?pos=${startVidTimestamp}&endPos=${endVidTimestamp}`;
        const vid_rec_mpjpeg = `http://localhost:7011/media/${event_cameraid}.mpjpeg?pos=${startVidTimestamp}&endPos=${endVidTimestamp}`;

        const newEvent = await db.create_event( [
            source_id,
            event_cameraid, 
            timestamp,
            epoch_time, 
            status, 
            analytics_type, 
            src_class,
            src_notes,
            rec_img_url,
            rec_img_data,
            live_img_url,
            vid_live_webm,
            vid_live_mpjpeg,
            vid_rec_webm,
            vid_rec_mpjpeg
        ] );
        console.log(`New Event from source_id ${source_id} @ ${timestamp}`);
        res.status(200).send("Event Created");
        //Trigger Socket IO to notify Client
        socket.emit('newEvent', () => {
            console.log('Notifing SocketIO Server of New Event');
        })
    },

    getAllEvents: async (req, res) => {
        console.log("Get All Events Called");
        const db = req.app.get('db');
        await db.get_all_events()
            .then( events => {
                res.status(200).send( events )
                //console.log( events );
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
        const timestamp = ( new Date() ).toLocaleString();
        const status = 'Updated';
        const db = req.app.get('db');
        console.log("req.body",req.body);
        let [ event_id,  
            user_id, 
            user_class,
            user_cat,
            user_notes 
        ] = req.body;
        const newEvent = await db.update_event( [
            event_id,  
            user_id,
            timestamp, 
            user_class,
            user_cat,
            user_notes,
            status 
        ] );
        console.log(`User Input to Event ${event_id} @ ${timestamp}`);
        res.status(200).send(newEvent);
    },

    deleteEvent: async (req, res) => {
        console.log("Delete Event Called");
        const db = req.app.get('db');
        const id = +req.params.id;
        await db.delete_event( [id] )
            .then( events => {
                res.status(200).send( events )
                //console.log("Sending: ", posts);
            } )
            .catch(err => {
                res.status(500).send({ errorMessage: `Error Deleting Event ID: ${id}`});
                console.log(err)
        });
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