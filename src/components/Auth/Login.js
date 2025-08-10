import React, { useState } from 'react';
import './Login.scss';
import { Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const navigation = useNavigate()
    // const handleClick = () => {
    //     alert('jiii')
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let data = await postLogin(formData.email, formData.password)
        console.log('Componetn', data);

        if (data.EC !== 0) {
            toast.error(data.EM);
        }
        else {
            toast.success(data.EM)
        }

        setTimeout(() => {
            setIsLoading(false);
            console.log('Form submitted:', formData);
        }, 1500);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false} />

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">
                            {activeTab === 'login' ? 'Login' : 'Sign up'}
                        </h1>
                        <p className="login-subtitle">
                            {activeTab === 'login'
                                ? 'Welcome back '
                                : 'Create new account ?'
                            }
                        </p>
                    </div>

                    <div className="login-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Sign up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {activeTab === 'register' && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Password"
                                    required
                                />
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

                    <div className="divider" style={{ display: 'flex', justifyContent: "center" }}>Or</div>

                    <div className="social-login">
                        <button className="social-btn">
                            <i className="fab fa-google"></i>
                            Google
                        </button>
                        <button className="social-btn" >
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

                <div className='back-home'>
                    <span
                        onClick={() => navigation('/')}

                    >&#60;&#60; Go to homepage
                    </span>
                </div>
            </div>
        </>

    );
}

export default Login;