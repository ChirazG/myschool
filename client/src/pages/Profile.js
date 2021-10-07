import React, { useState } from 'react';
import './Profile.css';
/*import 'bootstrap/dist/css/bootstrap.min.css';*/
import TimeTable from "../components/StudentProfile/TimeTable";
import AbsenceCalendar from "../components/StudentProfile/AbsenceCalendar";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { BsBoxArrowRight, BsChatDots, BsCheckBox } from "react-icons/bs";
import { FiPenTool } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { getMyMark, getMyPresence } from '../store/studentAction';
import UpdateModel from '../components/UpdateModel';
import StudentMark from '../components/StudentProfile/StudentMark';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const [show, setShow] = useState()

    const handleShowPresence = () => {
        setShow("presence");
        dispatch(getMyPresence(user._id))
    }
    const handleShow = () => {
        setShow("timetable")
    }

    const handleShowMytMark = () => {
        setShow("mark")
        dispatch(getMyMark(user._id))
    }

    const Logout = () => {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
        history.push("/login")
        window.location.reload(false)
    };
    let srcImg;
    if (user.gender == "male")
        srcImg = "https://bootdey.com/img/Content/avatar/avatar7.png"
    else srcImg = "https://e7.pngegg.com/pngimages/517/749/png-clipart-computer-icons-user-profile-avatar-woman-young-child-face.png"


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
                                            <label>Birthday</label>
                                            <p>{user.birthday}</p> {/*Birthday */}
                                        </div>

                                        <div className="media">
                                            <label>Gender</label>
                                            <p>{user.gender}</p> {/*Gender */}
                                        </div>
                                        <div className="media">
                                            <label>Last year</label>
                                            <p>{user.lastyear}</p> {/*Last year */}
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
                                            <label>Live with</label>
                                            <p>{user.livewith}</p> {/*Live with */}
                                        </div>
                                        <div className="media">
                                            {/* <Link to="/profile/updatestudent/:{user.id}">Update <FiPenTool /></Link> */}
                                            <UpdateModel user={user} role={localStorage.getItem("role")}>Update <FiPenTool /></UpdateModel>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6">
                            <div className="about-avatar">

                                <img src={srcImg} title="" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="counter">
                        <div className="row">
                            <div className="col-6 col-lg-3" onClick={handleShow}>
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="500" data-speed="500"><AiOutlineFieldTime /></h6>
                                    <p className="m-0px font-w-600">My Time Table</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3" onClick={handleShowPresence}>
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="150" data-speed="150"><FaRegCalendarTimes /></h6>
                                    <p className="m-0px font-w-600">My Presence Table</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center" onClick={handleShowMytMark}>
                                    <h6 className="count h2" data-to="850" data-speed="850"><BsCheckBox /></h6>
                                    <p className="m-0px font-w-600">My Marks</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center" onClick={Logout}>
                                    <h6 className="count h2" data-to="850" data-speed="850"><BsBoxArrowRight /></h6>
                                    <p className="m-0px font-w-600">Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: 'center', paddingTop: "5%", border: '2px solid gray', borderRadius: '2%', boxShadow: '5px 9px 9px', marginTop: '20px', alignItems: 'center' }}>
                        {show == "presence" ?
                            <AbsenceCalendar />
                            : show == "mark" ?
                                <StudentMark />
                                : show == "timetable" ? <TimeTable />
                                    : <div style={{ justifyContent: 'center', paddingBottom: '3%' }}><h1>Welcome {user.firstName} {user.lastName}!</h1></div>}
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Profile