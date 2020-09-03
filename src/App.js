import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_events } from './redux/actions/eventsActions';
import store from './redux/store';

//Components
import Nav from './components/Nav';
//import EventCard from './EventCard';
import axios from 'axios';
//import GridCard from './GridCard';



import routes from './routes';

// CSS
import './App.css';
import './reset.css';

function App() {

  const reduxState = store.getState();

  console.log("ReduxState: ", reduxState);

  let renderNav = useSelector( state => state.reduxUser.enabled ); 

  return (
    <div className="App">
      { renderNav ? <Nav/> : null }
      {routes}
    </div>
  );
}

export default App;
