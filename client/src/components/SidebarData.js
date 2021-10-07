import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Register",
        path: "/register",
        icon: <HiIcons.HiOutlinePencilAlt />,
        cName: "nav-text"
    },
    {
        title: "Admin",
        path: "/admin",
        icon: <CgIcons.CgProfile />,
        cName: "nav-text"
    },
    {/*
        title: "Library",
        path: "/library",
        icon: <IoIcons.IoIosPaper/>,
        cName: "nav-text"
    */},
    {/*
        title: "Teachers",
        path: "/teachers",
        icon: <IoIcons.IoMdPeople/>,
        cName: "nav-text"
    */},

    {/*
        title: "Contact Us",
        path: "/contactus",
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: "nav-text"
    */},

]
