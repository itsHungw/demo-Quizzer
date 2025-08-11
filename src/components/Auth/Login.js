import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { postLogin, postRegister } from '../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';



function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');


    // Update activeTab when location.state changes
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
            // Reset form fields when switching tabs
            setEmail('');
            setPassword('');
            setUserName('');
            setEmailError('');
            setPasswordError('');
            setUsernameError('');
        }
    }, [location.state]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let hasError = false;
        if (!validateEmail(email)) {
            setEmailError('Email is invalid.');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Password is required.');
            hasError = true;
        }
        if (hasError) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return;
        }

        let data = await postLogin(email, password);
        if (data.EC !== 0) {
            toast.error(data.EM);
        } else {
            dispatch({
                type: 'FETCH_USER',
                payload: data
            })
            toast.success(data.EM);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let hasError = false;
        if (!validateEmail(email)) {
            setEmailError('Email is invalid.');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Password is required.');
            hasError = true;
        }
        if (!username) {
            setUsernameError('Username is required.');
            hasError = true;
        }
        if (hasError) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return;
        }

        let data = await postRegister(email, username, password);
        if (data.EC !== 0) {
            toast.error(data.EM);
        } else {
            toast.success(data.EM);
            setTimeout(() => {
                setActiveTab('login'); // Switch to login tab after successful registration
                setEmail('');
                setPassword('');
                setUserName('');
                setEmailError('');
                setPasswordError('');
                setUsernameError('');
            }, 2000);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Email is invalid.');
        } else {
            setEmailError('');
        }
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setUserName(value);
        if (value.length > 0) {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (activeTab === 'register' && value.length < 5) {
            setPasswordError('Password must be longer than 4 characters');
        } else {
            setPasswordError('');
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">
                            {activeTab === 'login' ? 'Login' : 'Sign up'}
                        </h1>
                        <p className="login-subtitle">
                            {activeTab === 'login'
                                ? 'Welcome back'
                                : 'Create new account'}
                        </p>
                    </div>

                    <div className="login-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('login');
                                setEmail('');
                                setPassword('');
                                setUserName('');
                                setEmailError('');
                                setPasswordError('');
                                setUsernameError('');
                            }}
                        >
                            Login
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab('register');
                                setEmail('');
                                setPassword('');
                                setUserName('');
                                setEmailError('');
                                setPasswordError('');
                                setUsernameError('');
                            }}
                        >
                            Sign up
                        </button>
                    </div>

                    <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="login-form">
                        {activeTab === 'register' && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={username}
                                    className={`form-control${usernameError ? ' is-invalid' : ''}`}
                                    style={usernameError ? { borderColor: 'red' } : {}}
                                    onChange={handleNameChange}
                                    placeholder="Full name"
                                />
                                {usernameError && <div style={{ color: 'red', fontSize: '13px' }}>{usernameError}</div>}
                            </div>
                        )}

                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                className={`form-control${emailError ? ' is-invalid' : ''}`}
                                style={emailError ? { borderColor: 'red' } : {}}
                                onChange={handleEmailChange}
                                placeholder="Email"
                            />
                            {emailError && <div style={{ color: 'red', fontSize: '13px' }}>{emailError}</div>}
                        </div>

                        <div className="form-group">
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    className={`form-control${passwordError ? ' is-invalid' : ''}`}
                                    style={passwordError ? { borderColor: 'red' } : {}}
                                />
                                {passwordError && <div style={{ color: 'red', fontSize: '13px' }}>{passwordError}</div>}
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {activeTab === 'login' && (
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a href="#" className="forgot-password">Forgot your password?</a>
                            </div>
                        )}

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                activeTab === 'login' ? 'Sign in' : 'Sign up'
                            )}
                        </button>
                    </form>

                    <div className="divider" style={{ display: 'flex', justifyContent: 'center' }}>
                        Or
                    </div>

                    <div className="social-login">
                        <button className="social-btn">
                            <i className="fab fa-google"></i>
                            Google
                        </button>
                        <button className="social-btn">
                            <i className="fab fa-github"></i>
                            GitHub
                        </button>
                    </div>
                </div>

                <div className="switch-form">
                    {activeTab === 'login' ? (
                        <p>
                            Chưa có tài khoản?
                            <button onClick={() => setActiveTab('register')}>
                                Đăng ký
                            </button>
                        </p>
                    ) : (
                        <p>
                            Đã có tài khoản?
                            <button onClick={() => setActiveTab('login')}>
                                Đăng nhập
                            </button>
                        </p>
                    )}
                </div>

                <div className="back-home">
                    <span onClick={() => navigate('/')}>
                        &#60;&#60; Go to homepage
                    </span>
                </div>
            </div>
        </>
    );
}

export default Login;