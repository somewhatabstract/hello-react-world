import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const mountElement = document.getElementById('root');
const reactMountFn = (mountElement.childElementCount === 0)
    ? ReactDOM.render
    : ReactDOM.hydrate;

reactMountFn(<App />, mountElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
