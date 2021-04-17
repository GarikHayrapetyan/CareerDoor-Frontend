import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/style.css';
import 'react-calendar/dist/Calendar.css'
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css'
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/store/store';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
