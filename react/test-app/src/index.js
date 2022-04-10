import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';

import App from './App';
import Chat from './Chat';
import Location from './components/Location';
import Search from './components/Search';
import AccordionApp from './components/Accordian';
import ReduxApp from "./components/ReduxApp"
import reducers from './reducers';

import reportWebVitals from './reportWebVitals';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <Chat/>,
  document.getElementById('root')
);

ReactDOM.render(
  <Location/>,
  document.getElementById('root')
);


ReactDOM.render(
  <Search/>,
  document.getElementById('root')
);


ReactDOM.render(
  <AccordionApp/>,
  document.getElementById('root')
);*/

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <ReduxApp/>
  </Provider> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
