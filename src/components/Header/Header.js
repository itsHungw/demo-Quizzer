import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../service/apiService';
import { doLogout } from '../../redux/action/userAction';
import toast from 'react-hot-toast';
import Language from './Language';
import { useTranslation } from 'react-i18next';
const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const { t } = useTranslation()

    // console.log('acc', account)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('register');
    const navigate = useNavigate();

    const handleLogin = () => {
        setActiveTab('login');
        navigate('/login', { state: { activeTab: 'login' } });
    };

    const handleRegister = () => {
        setActiveTab('register');
        navigate('/login', { state: { activeTab: 'register' } });
    };

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token)
        // console.log(res)
        if (res.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink className='navbar-brand' to="/">QUIZZER</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="/users">User</NavLink>
                        {
                            account.role === 'USER' ?
                                <NavLink className='nav-link' to="/profile">Profile</NavLink>
                                :
                                <NavLink className='nav-link' to="/admins">Admin</NavLink>
                        }
                    </Nav>

                    <Nav>
                        {
                            isAuthenticated ?
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                    >
                                        Log out
                                    </NavDropdown.Item>

                                </NavDropdown>
                                :
                                <>
                                    <button className='btn-login' onClick={handleLogin}>Login</button>
                                    <button className='btn-sign-up' onClick={handleRegister}>Sign up</button>

                                </>
                        }

                        <Language />


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;