import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import { get_user } from './redux/actions/userActions';
import axios from 'axios';

// Socket IO Import
//import openSocket from 'socket.io-client';


//Components
import Nav from './components/Nav';
import routes from './routes';

// CSS
import './reset.css';
import './styles/App.css';
import './styles/eventcard.css';
import './styles/grid.css';
import './styles/settings.css';

// Socket IO Path
//const socket = openSocket('http://192.168.100.100:8000');

function App(props) {

  const dispatch = useDispatch();   

  const[newEventToggle, setNewEventToggle] = useState(false);

  useEffect( () => {
    getUserSession();
    //connectToSocket();
  }, [])

  const getUserSession = async () => {
    console.log("---Updating User Session")
    await axios
        .get('/auth/getuser')
        .then( res => {
            console.log("App Update User", res.data)
            dispatch( get_user(res.data) )
        } )   
  }

  // const connectToSocket = () => {
  //   console.log('Connecting to Socket');
  //   socket.emit('test');
  //   socket.on('backTest', () => {
  //     console.log('Socket Test Success');
  //   })
  //   socket.on('newEventClient', (message) => {
  //     console.log(message);
  //     setNewEventToggle(true);
  //   })
  // }

  return (
    <div className="App">
      { props.history.location.pathname !== '/' ? <Nav/> : null }
      {routes}
    </div>
  );
}

export default withRouter(App);
