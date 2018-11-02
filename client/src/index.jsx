import React from 'react';
import ReactDOM from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './app';
import './index.css';

if ('serviceWorker' in navigator) {
  runtime.register();
}

console.log(`Rendering ${process.env.NODE_ENV} version of ${HTMLTITLE} at version ${VERSION}`);

ReactDOM.render((
  <App />
), document.getElementById('root'));
