import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import App from './App';
import AdminPage from './components/Admin/Admin';
import UserPage from './components/User/User';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/contents/Dashboard';
import ManageUser from './components/Admin/contents/MangeUser';
import Auth from './components/Auth/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from './Layout';
import { PersistGate } from 'redux-persist/integration/react'
// import 'react-bootstrap';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>

      {/* <RootComponent /> */}
      <HashRouter>
        <Layout />
      </HashRouter>

    </PersistGate>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
