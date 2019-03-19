import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import createStore from "./store";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
