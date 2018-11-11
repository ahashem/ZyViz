import './logrocket';

import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { addReducer, Provider, store, useMiddleware } from 'speedux';
import { StoreManager } from 'speedux/lib/store';

import browserHistory from './history';
import App from './App/App';
import * as serviceWorker from './utils/serviceWorker';
// Global Style files
import 'antd/dist/antd.css';
import './styles/index.scss';


// define and add routing middleware
const routingMiddleware = routerMiddleware(browserHistory);
addReducer('routing', routerReducer);

// Updates root reducer
StoreManager.update();
// use 'routingMiddleware'
useMiddleware(routingMiddleware);


const AppWrapper = (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

render(AppWrapper, document.getElementById('root'));

// Enable service workers in Production only to support offline Mode and load faster.
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
