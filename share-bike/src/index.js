import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Router from "./router/index"
import store from "./redux/store/index"
import {Provider} from "react-redux" //注入
ReactDOM.render(
    <Provider store={store}>
        <App>
        <Router></Router>
        </App>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
