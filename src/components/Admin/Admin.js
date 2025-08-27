import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Scrollbar } from 'react-scrollbars-custom';
import Language from "../Header/Language"
import { NavDropdown } from 'react-bootstrap';


const AdminPage = (props) => {
    const [collapsed, setCollapsed] = useState(false)

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
                                <NavDropdown.Item href="#action/3.3">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    // onClick={() => handleLogout()}
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