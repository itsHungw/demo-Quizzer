import SideBar from "./SideBar"
import './Admin.scss'
import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Scrollbar } from 'react-scrollbars-custom';
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
                        <FaBars onClick={() => setCollapsed(!collapsed)} />
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