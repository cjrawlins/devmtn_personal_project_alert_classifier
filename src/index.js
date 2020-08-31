import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';

// CSS
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
