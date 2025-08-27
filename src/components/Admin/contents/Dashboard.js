import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';
import { getDashboardOverview } from '../../../service/apiService';

const Dashboard = () => {
    // API data
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDataDashboard();
        // let interval = setInterval(() => {
        // }, 1000)
        // return () => clearInterval(interval)

    }, []);

    const fetchDataDashboard = async () => {
        try {
            setLoading(true);

            let res = await getDashboardOverview();

            //build data 
            // res = {
            //     DT: {
            //         users: {
            //             total: 11,
            //             countUsers: 7,
            //             countAdmin: 4
            //         },
            //         others: {
            //             countQuiz: 4,
            //             countQuestions: 14,
            //             countAnswers: 33
            //         }
            //     },
            //     EC: 0,
            //     EM: "Get Dashboard Overview succeed"
            // };

            if (res.EC === 0) {
                setApiData(res);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !apiData) {
        return (
            <div className="container-fluid bg-light min-vh-100 py-4">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        );
    }
    // Chart data
    const chartData = [
        { name: 'Users', value: apiData.DT.users.countUsers },
        { name: 'Admins', value: apiData.DT.users.countAdmin },
        { name: 'Quizzes', value: apiData.DT.others.countQuiz },
        { name: 'Questions', value: apiData.DT.others.countQuestions }
    ];

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col">
                    <h2 className="fw-bold text-dark">Quiz Dashboard</h2>
                    <p className="text-muted">System Overview</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <Users className="text-primary mb-2" size={32} />
                            <h4 className="fw-bold text-dark">{apiData.DT.users.total}</h4>
                            <p className="text-muted mb-0">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <BookOpen className="text-success mb-2" size={32} />
                            <h4 className="fw-bold text-dark">{apiData.DT.others.countQuiz}</h4>
                            <p className="text-muted mb-0">Total Quizzes</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <HelpCircle className="text-warning mb-2" size={32} />
                            <h4 className="fw-bold text-dark">{apiData.DT.others.countQuestions}</h4>
                            <p className="text-muted mb-0">Questions</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <CheckCircle className="text-info mb-2" size={32} />
                            <h4 className="fw-bold text-dark">{apiData.DT.others.countAnswers}</h4>
                            <p className="text-muted mb-0">Total Answers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h5 className="fw-bold mb-4">Statistics Overview</h5>
                            <div style={{ height: '350px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">User Details</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Regular Users:</span>
                                <span className="fw-bold text-primary">{apiData.DT.users.countUsers}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Administrators:</span>
                                <span className="fw-bold text-success">{apiData.DT.users.countAdmin}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Content Analytics</h6>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Avg Questions/Quiz:</span>
                                <span className="fw-bold text-warning">
                                    {(apiData.DT.others.countQuestions / apiData.DT.others.countQuiz).toFixed(1)}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Avg Answers/Question:</span>
                                <span className="fw-bold text-info">
                                    {(apiData.DT.others.countAnswers / apiData.DT.others.countQuestions).toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;