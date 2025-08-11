import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap';
const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    console.log(account, isAuthenticated)

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

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink className='navbar-brand' to="/">QUIZZER</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="/users">User</NavLink>
                        <NavLink className='nav-link' to="/admins">Admin</NavLink>
                    </Nav>
                    <Nav>
                        {
                            isAuthenticated ?
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Log out
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <>
                                    <button className='btn-login' onClick={handleLogin}>Login</button>
                                    <button className='btn-sign-up' onClick={handleRegister}>Sign up</button>

                                </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;