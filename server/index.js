// Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const app = express();

//socket.io dependencies
// const server = require('https').createServer(app);
// const options = { /* ... */ };
// const io = require('socket.io')(server)

// Controllers
const authCtrl = require('./controllers/authController')
const eventCtrl = require('./controllers/eventController')
const settingsCtrl = require('./controllers/settingsController')

// Create instance app from express
// const app = express();

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
app.post('/auth/register', authCtrl.register); // create a new user in the database
app.post('/auth/login', authCtrl.login); // logs in a user, and creates a session
app.put('/auth/update', authCtrl.updateUser); // updates user info
app.delete('/auth/logout', authCtrl.logout); // logs out a user
app.get('/auth/getuser', authCtrl.getUser); // returns session user

// ADD Change user pass, enable/disable user, delete user


//   2. Event Controller File: 'eventController.js', var name: eventCtrl
app.post('/api/event', eventCtrl.createEvent); // adds new event. Comes from NX Witness

app.get('/api/events/all', eventCtrl.getAllEvents);
app.get('/api/events', eventCtrl.getEvents); // POST-MVP req.body has start/stop timestamp
// VV Temp VV
app.get('/api/getimage', eventCtrl.getImage);
app.get('/api/event/:id', eventCtrl.getEvent); // gets single event req.params had event_id
app.get('/api/event/?', eventCtrl.searchEvents); // req.query has search params

app.put('/api/event/:id', eventCtrl.updateEvent); // adds data to event

app.delete('/api/event/:id', eventCtrl.deleteEvent); // deletes event by event_id, req.params had event_id

//   3. Settings Controller File: 'settingsController.js', var name: settingsCtrl
app.post('/api/settings/source', settingsCtrl.addSource); // Add Source Camera
// app.get('/api/settings', settingsCtrl.getSettings); // Get full list of settings (includes subscribe cameras)
// app.put('/api/settings/', settingsCtrl.setSetting); // Record settings in database, setting in req.body

//Set up server to listen on port and log
app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
});

