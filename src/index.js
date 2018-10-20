import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'speedux';

import App from './App/App';
import * as serviceWorker from './utils/serviceWorker';

import 'antd/dist/antd.css';
import './styles/index.scss';


const AppWrapper = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(AppWrapper, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
