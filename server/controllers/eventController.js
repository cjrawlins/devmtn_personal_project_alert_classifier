const axios = require('axios').default;

module.exports = {
    createEvent: async (req, res) => {
        console.log("Create Event Called");
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

    getAllEvents: async (req, res) => {

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
        
    }

}