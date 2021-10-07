import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import studentLogin from '../../api/studentapi';
import { loginFail, loginSuccess } from '../../store/loginSlice';
import { getStudentAdminProfile, getStudentProfile } from '../../store/userAction';
import Recherche from './Recherche'

const AllStudent = (props) => {

  const studentInfo = ["id", "First Name", "Last Name", "Gender", "Birthday", "Last year", "Live with", "Phone", "Adresse", "Email"];

  const dispatch = useDispatch();
  const location = useLocation()
  const history = useHistory();
  const { allstudent } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user)
  const { isLoading, isAuth, error } = useSelector(state => state.login);
  const [search, setSearch] = useState()
  const handleSearch = (Usersearch) => {
    setSearch(Usersearch);
  };

  var affiche = allstudent;
  search ? affiche = search : affiche = allstudent;


  return (
    <div style={{ padding: "2%" }} >
      <Recherche allusers={allstudent} handleSearch={handleSearch}></Recherche>
      <h3>Student List</h3>
      <Table responsive>
        <thead>
          <tr>

            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index}>{studentInfo[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>

          {affiche.map((row, index) => <tr><td>{row._id}</td>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.gender}</td>
            <td>{row.birthday.substring(0, 10)}</td>
            <td>{row.lastyear}</td>
            <td>{row.livewith}</td>
            <td>{row.phone}</td>
            <td>{row.adresse}</td>
            <td>{row.email}</td>
          </tr>)}
        </tbody>
      </Table>

    </div>
  )
}

export default AllStudent

    //  let { from } = location.state || { from: { pathname: "/admin/allstudent" } };

    //  useEffect(() => {
    //   history.replace(from);
    //   }, [history]);

    // const showProfile = async (e) => {
    //     e.preventDefault();
    //     console.log("9999",allstudent[0], allstudent[0]._id)

    //     // if (!user.email || !user.password) {
    //     //     return alert("fill up the form!");
    //     // }
    //     // dispatch(loginPending());

    //     try {
    //         // const isAuth = true;
    //         // console.log("888", isAuth)
    //         // if (isAuth.status == "error") {
    //         //     return dispatch(loginFail(isAuth.message));
    //         // }
    //         // dispatch(loginSuccess());

    //         await dispatch(getStudentAdminProfile(user._id)); //here
    //          history.push("/profile/:{user._id}");
    //         console.log("uuu", user?._id)
    //     } catch (error) {
    //         dispatch(loginFail(error.message));
    //     }
    // }

    // const showProfile = () => {
    //   console.log("iiii", allstudent[0]._id)

    //   dispatch(loginSuccess());
    //   dispatch(getStudentProfile()); //here
    //  // history.push(`/profile/${allstudent[0]._id}`);  
    // }

/* <td>
  <ButtonGroup size="sm" onClick = {(e)=>{
     dispatch(getStudentAdminProfile(row._id)); //here
    history.push("/profile/:{user._id}");
   console.log("uuu", row._id)
  }}>
    <Link ><Button type= "submit">See Profile</Button></Link>
  </ButtonGroup>
</td>
<td>
  <ButtonGroup size="sm">
    <Link><Button>Message</Button></Link>
  </ButtonGroup>
</td> */