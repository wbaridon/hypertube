import React from 'react';
import ReactDOM from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'Reducers/index';
import './index.css';

import AppWrapper from './app-wrapper';


if ('serviceWorker' in navigator) {
  runtime.register();
}

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log(`Rendering ${process.env.NODE_ENV} version of ${HTMLTITLE} at version ${VERSION}`);

ReactDOM.render((
  <Provider store={store}>
    <AppWrapper />
  </Provider>
), document.getElementById('root'));
