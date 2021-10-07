import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from "./SidebarData";
import './Navbar.css';
import { IconContext } from "react-icons";
import Button from 'react-bootstrap/Button'
import { SidebarDataNot } from './SidebarDataNot';
import { SidebarDataTeacher } from './SidebarDataTeacher';
import { SidebarDataStudent } from './SidebarDataStudent';


const Navbar = () => {

    const { isAuth } = useSelector((state) => state.login);
    const [sidebar, setSidebar] = useState(false);
    const role = localStorage.getItem("role")
    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <>
            <IconContext.Provider value={{ color: "rgb(26, 26, 51)" }} >

                <div className="navbar">

                    <Link to="#" className="menu-bar">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    <Link to="/login"><Button variant="outline-light" style={{ background: isAuth ? "transparent" : "none", border: isAuth ? "none" : "null", fontSize: isAuth ? 0 : "none" }}>LOGIN</Button></Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar} >
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {SidebarData.map((item, index) => {
                            if (isAuth && role == "admin") {
                                return (

                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )

                            }

                        })}

                        {SidebarDataTeacher.map((item, index) => {
                            if (isAuth && role == "teacher") {
                                return (

                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )

                            }

                        })}

                        {SidebarDataStudent.map((item, index) => {
                            if (isAuth && role == "student") {
                                return (

                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )

                            }

                        })}

                        {SidebarDataNot.map((item, index) => {
                            if (!isAuth) {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            }
                        })}

                    </ul>
                </nav>
            </IconContext.Provider>

        </>
    )
}

export default Navbar
