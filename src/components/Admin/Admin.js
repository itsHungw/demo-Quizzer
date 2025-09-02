import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Scrollbar } from 'react-scrollbars-custom';
import Language from "../Header/Language"
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { doLogout } from '../../redux/action/userAction';
import { logout } from '../../service/apiService';


const AdminPage = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const account = useSelector(state => state.user.account);
    const navigate = useNavigate();

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
        <div className="admin-container">

            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <Scrollbar >

                    <div className="admin-header">
                        <span className="toggle-sidebar"><FaBars onClick={() => setCollapsed(!collapsed)} /></span>
                        <div className="setting">
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => handleLogout()}
                                    href="#action/3.2">
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Language />
                        </div>
                    </div>

                    <div className="admin-main">
                        <Outlet />
                    </div>
                </Scrollbar>

            </div>
        </div >
    )
}

export default AdminPage