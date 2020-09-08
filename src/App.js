import React from 'react';
import store from './redux/store';

//Components
import Nav from './components/Nav';
import routes from './routes';

// CSS
import './reset.css';
import './App.css';
import './styles/grid.css';


function App() {

  const reduxState = store.getState();

  return (
    <div className="App">
      { reduxState.reduxUser.enabled ? <Nav/> : null }
      {routes}
    </div>
  );
}

export default App;
