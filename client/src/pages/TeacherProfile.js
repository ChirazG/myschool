import React, { useState } from 'react';
import './Profile.css';
import { Link, useHistory } from "react-router-dom";
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { BsBoxArrowRight, BsChatDots, BsCheckBox } from "react-icons/bs";
import { FiPenTool } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentMark, getStudentPresence, getSubject } from '../store/teacherAction';
import UpdateModel from '../components/UpdateModel';
import TimeTable from '../components/StudentProfile/TimeTable';
import Profile from './Profile';
import PresenceList from '../components/teacherProfile/PresenceList';
import Marks from '../components/teacherProfile/Marks';
import { getAllStudents } from '../store/userAction';

const TeacherProfile = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    dispatch(getSubject(user._id));
    const [show, setShow] = useState()
    const handleShowStudentMark = () => {
        setShow("mark")
        dispatch(getStudentMark(user._id))
        dispatch(getAllStudents())
    }

    const handleShowStudentPresence = (e) => {
        e.preventDefault()
        setShow("presence")
        dispatch(getAllStudents())
        dispatch(getStudentPresence(user._id))
    }
    const handleShow = () => {
        setShow("timetable")
    }


    const Logout = () => {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
        history.push("/login")
        window.location.reload(false)
    };


    return (
        <div className='profile'>
            <section className="section about-section gray-bg" id="about">
                <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-lg-6">
                            <div className="about-text go-to">
                                <h3 className="dark-color">About Me</h3>
                                {/*firstName + lastName */}
                                <h6 className="theme-color lead">{user.firstName}  {user.lastName}</h6>
                                <div className="row about-list">
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>Id</label>
                                            <p>{user._id}</p> {/*id */}
                                        </div>
                                        <div className="media">
                                            <label>CIN</label>
                                            <p>{user.CIN}</p> {/*CIN */}
                                        </div>
                                        <div className="media">
                                            <label>Subject</label>
                                            <p>{user.subject}</p> {/*subject */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>E-mail</label>
                                            <p>{user.email}</p> {/*E-mail */}
                                        </div>
                                        <div className="media">
                                            <label>Phone</label>
                                            <p>{user.phone}</p> {/* phone*/}
                                        </div>
                                        <div className="media">
                                            <label>Address</label>
                                            <p>{user.adresse}</p> {/*Address */}
                                        </div>

                                        <div className="media">
                                            {/* to="/teacherprofile/updateteacher/:{user.id}" */}
                                            <UpdateModel user={user} role={localStorage.getItem("role")}>Update <FiPenTool /></UpdateModel>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6">
                            <div className="about-avatar">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupQpbrGErpE4t6puLWyfyN-CBMOsA4ccjig&usqp=CAU" title="" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="counter">
                        <div className="row">
                            <div className="col-6 col-lg-3" onClick={handleShow}>
                                <div className="count-data text-center" >
                                    <h6 className="count h2" data-to="500" data-speed="500"><AiOutlineFieldTime /></h6>
                                    <p className="m-0px font-w-600">My Time Table</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center" onClick={handleShowStudentPresence}>
                                    <h6 className="count h2" data-to="150" data-speed="150"><FaRegCalendarTimes /></h6>
                                    <p className="m-0px font-w-600">Presence Table</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center" onClick={handleShowStudentMark} >
                                    <h6 className="count h2" data-to="850" data-speed="850"><BsCheckBox /></h6>
                                    <p className="m-0px font-w-600">Marks</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center" onClick={Logout}>
                                    <h6 className="count h2" data-to="850" data-speed="850"><BsBoxArrowRight /></h6>
                                    <p className="m-0px font-w-600">Logout</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                {/* here */}
                                {/* <Link to='/teacherprofile/chats/:{user.id}'><div className="count-data text-center">
                                    <h6 className="count h2" data-to="190" data-speed="190"><BsChatDots /></h6>
                                    <p className="m-0px font-w-600">Contact Student</p>
                                </div></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: 'center', paddingTop: "5%", border: '2px solid gray', borderRadius: '2%', boxShadow: '5px 9px 9px', marginTop: '20px', alignItems: 'center' }}>
                        {show == "presence" ?
                            <PresenceList userid={user._id} />
                            : show == "mark" ?
                                <Marks userid={user._id} />
                                : show == "timetable" ? <TimeTable />
                                    : <div style={{ justifyContent: 'center', paddingBottom: '3%' }}><h1>Welcome {user.firstName} {user.lastName}!</h1></div>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TeacherProfile
