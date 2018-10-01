import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';

import store from './redux/store/store';
import './styles/css/index.css';

const jsx = (
  <div>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);

// store.subscribe(() => console.log(store.getState()));


ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();


// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test --env=jsdom",
// "eject": "react-scripts eject",
