import './logrocket';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'speedux';

import App from './App/App';
import * as serviceWorker from './utils/serviceWorker';
// Global Style files
import 'antd/dist/antd.css';
import './styles/index.scss';


const AppWrapper = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(AppWrapper, document.getElementById('root'));

// Enable service workers in Production only to support offline Mode and load faster.
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
