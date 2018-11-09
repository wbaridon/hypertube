import React from 'react';
import ReactDOM from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { asyncActionsMiddleware } from 'redux-minimal-code-async-actions';
import App from './app';
import './index.css';
import rootReducer from './reducers/index';

if ('serviceWorker' in navigator) {
  runtime.register();
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger, asyncActionsMiddleware));

console.log(`Rendering ${process.env.NODE_ENV} version of ${HTMLTITLE} at version ${VERSION}`);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
