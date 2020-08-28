// Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

// Create instance app from express
const app = express();

// Get Database connection info from .env
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;


// Top-Level-Middleware to parse JSON
app.use(express.json());

app.use(session( {
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET
} ) )

// Invoke massive database connector
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
    }).then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Connected to Database')
    })
    .catch( error => console.log(error));

// Endpoints //
//   1. Auth Controller, File: 'authController.js', var name: authCtrl
app.post('/api/auth/register', authCtrl.register); // create a new user in the database
app.post('/api/auth/login', authCtrl.login); // logs in a user, and creates a session
app.delete('/api/auth/logout', authCtrl.logout); // logs out a user
app.get('/api/auth/getuser', authCtrl.getUser); // returns session user

//   2. Event Controller File: 'eventController.js', var name: eventCtrl
app.get('/api/events/all', eventCtrl.getAllEvents);
app.get('/api/events', eventCtrl.getEvents); // POST-MVP req.body has start/stop timestamp
app.get('/api/event/:id', eventCtrl.getEvent); // gets single event req.params had event_id
app.get('/api/event/?', eventCtrl.searchEvent); // req.query has search params

app.put('/api/event/:id', eventCtrl.updateEvent); // adds data to event
app.delete('/api/event/:id', eventCtrl.deleteEvent); // deletes event by event_id, req.params had event_id
app.post('/api/event/', eventCtrl.createEvent); // adds new event. Comes from NX Witness

//   3. Settings Controller File: 'settingsController.js', var name: settingsCtrl
app.get('/api/settings', settingsCtrl.getSettings); // Get full list of settings (includes subscribe cameras)
app.put('/api/settings/', settingsCtrl.setSetting); // Record settings in database, setting in req.body


//Set up server to listen on port and log
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
    });