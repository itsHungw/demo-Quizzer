
import 'react-pro-sidebar/dist/css/styles.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { SiQualcomm } from "react-icons/si";

import './SideBar.scss';
import { Link, useNavigate } from 'react-router-dom';


const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate()
    return (
        <>
            <ProSidebar
                image={image ? sidebarBg : false}
                s
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <SiQualcomm size={'2em'} color='#025df1ff' />
                        <span onClick={() => { navigate('/') }}>QUIZZER</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                            suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}>Component</MenuItem> */}
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            icon={<FaGem />}
                            title={"Feature"}
                        // icon={<FaRegLaughWink />}
                        >
                            <MenuItem>
                                User management
                                <Link to="manage-users" />
                            </MenuItem>
                            <MenuItem>Quizzes management<Link to="manage-quizzes" /></MenuItem>
                            <MenuItem>Question management<Link to="manage-questions" /></MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/itsHungw"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: '700' }}>
                                @itsHungw
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar