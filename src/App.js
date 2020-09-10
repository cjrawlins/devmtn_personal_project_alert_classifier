import React from 'react';
import { withRouter } from 'react-router-dom'; 


//Components
import Nav from './components/Nav';
import routes from './routes';

// CSS
import './reset.css';
import './styles/App.css';
import './styles/eventcard.css';
import './styles/grid.css';
import './styles/settings.css';

function App(props) {

  return (
    <div className="App">
      { props.history.location.pathname !== '/' ? <Nav/> : null }
      {routes}
    </div>
  );
}

export default withRouter(App);
