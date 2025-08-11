import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import AdminPage from './components/Admin/Admin';
import UserPage from './components/User/User';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/contents/Dashboard';
import ManageUser from './components/Admin/contents/MangeUser';
import Login from './components/Auth/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ListQuiz from './components/User/ListQuiz';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>
                <Route path="/admins" element={<AdminPage />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default Layout