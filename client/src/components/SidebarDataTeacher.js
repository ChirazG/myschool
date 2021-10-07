import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";

export const SidebarDataTeacher = [
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
        title: "Teacher Profile",
        path: "/teacherprofile/:{user.id}",
        icon: <CgIcons.CgProfile />,
        cName: "nav-text"
    },


]