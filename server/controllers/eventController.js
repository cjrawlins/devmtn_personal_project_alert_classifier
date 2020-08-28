
module.exports = {
    createEvent: async (req, res) => {
        console.log("Create Event Called");
        const db = req.app.get('db');
        let { source_id, 
            timestamp, 
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
        console.log(`New Event from source_id ${source_id} @ ${timestamp}`)
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
        
    },

    deleteEvent: async (req, res) => {
        
    }

}