import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import { Toaster } from 'react-hot-toast';

initializeApp({
apiKey: "AIzaSyCkITagWMZ-q6tJCbyNu53nUxqD1cVJ-aY",
authDomain: "juiraauth.firebaseapp.com",
projectId: "juiraauth",
storageBucket: "juiraauth.appspot.com",
messagingSenderId: "449866263758",
appId: "1:449866263758:web:815a52d3f3e40339db349f",
measurementId: "G-HRP08S0161"
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Toaster/>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*
  ___           _           
 |_ _|_ __   __| | _____  __
  | || '_ \ / _` |/ _ \ \/ /
  | || | | | (_| |  __/>  < 
 |___|_| |_|\__,_|\___/_/\_\
                            */