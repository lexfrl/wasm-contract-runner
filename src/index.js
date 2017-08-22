import './polyfill';
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
/* eslint-disable */

if (!window.WebAssembly) {
  alert('Your browser doesn\'t support WebAssembly');
  /* eslint-enable */
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
