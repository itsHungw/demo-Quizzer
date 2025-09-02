

import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminPage from './components/Admin/Admin';

import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/contents/Dashboard';
import ManageUser from './components/Admin/contents/MangeUser';
import Login from './components/Auth/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import QuizzesManage from './components/Admin/contents/Quiz/QuizzesMange';

import QuestionManage from './components/Admin/contents/Question/QuestionManage';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';
import ProfileUser from './components/Profile/Profile';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            404. Your URL not found any data
        </div>
    )
}
const Layout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Routes>
                <Route path="/" element={<Navigate to="/demo-Quizzer" replace />} />
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>

                    } />
                </Route>
                <Route path="/profile" element={<ProfileUser />} />

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<QuizzesManage />} />
                    <Route path="manage-questions" element={<QuestionManage />} />


                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />

            </Routes>

        </Suspense>
    )
}

export default Layout