import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Row, Table } from 'react-bootstrap'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { BsBoxArrowRight, BsBriefcaseFill, BsCheckBox, BsFillPeopleFill } from 'react-icons/bs'
import { FaRegCalendarTimes } from 'react-icons/fa'
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FiPenTool } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Router, Switch, useHistory } from 'react-router-dom'
import UpdateModel from '../components/UpdateModel';
import AddTeacher from '../components/Admin/AddTeacher'
import AllStudent from '../components/Admin/AllStudent'
import AllTeacher from '../components/Admin/AllTeacher'
import TimeTable from '../components/StudentProfile/TimeTable'
import { getAllStudents, getAllTeachers } from '../store/userAction'



const Admin = () => {
  let history = useHistory();
  // const { allstudent } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [show, setShow] = useState()
  const handleShowStudent = () => {
    setShow("student")
    dispatch(getAllStudents())
  }
  const handleShowTeacher = () => {
    setShow("teacher")
    dispatch(getAllTeachers())
  }
  const handleShowAddTeacher = () => {
    setShow("add")
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
                <h6 className="theme-color lead">{user.name}</h6>
                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Id</label>
                      <p>{user._id}</p> {/*id */}
                    </div>
                    <div className="media">
                      {/* to="/teacherprofile/updateteacher/:{user.id}" */}
                      <UpdateModel user={user} role={localStorage.getItem("role")}>Update <FiPenTool /></UpdateModel>
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
              <div className="col-6 col-lg-3" onClick={handleShowStudent}>
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="500" data-speed="500"><BsFillPeopleFill /></h6>
                  <p className="m-0px font-w-600">All Student</p>
                </div>
              </div>
              <div className="col-6 col-lg-3" onClick={handleShowTeacher}>
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="150" data-speed="150"><BsBriefcaseFill /></h6>
                  <p className="m-0px font-w-600">All Teacher</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center" onClick={handleShowAddTeacher}>
                  <h6 className="count h2" data-to="850" data-speed="850"><BsFillPersonPlusFill /></h6>
                  <p className="m-0px font-w-600">Add Teacher</p>
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
          <div className="row" style={{ justifyContent: 'center', paddingTop: "5%", width: '100%', border: '2px solid gray', borderRadius: '2%', boxShadow: '5px 9px 9px', marginTop: '20px', alignItems: 'center' }}>
            {show == "student" ? <div><AllStudent /></div>
              : show == "teacher" ? <AllTeacher />
                : show == "add" ? <AddTeacher />
                  : <div style={{ justifyContent: 'center', paddingBottom: '3%' }}><h1>Welcome {user.name}</h1></div>}
          </div>
        </div>
      </section>
    </div>











  )
}

export default Admin
/* <Link to="/library" ><Button variant="secondary">Posts Page</Button></Link> */