import React, { useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from "react-icons/bs";
import Recherche from './Recherche'

const AllTeacher = (props) => {
  const teacherInfo = ["id", "First Name", "Last Name", "CIN", "Subject", "Phone", "Adresse", "Email"]
  const dispatch = useDispatch();
  const { allteacher } = useSelector(state => state.user);

  const [search, setSearch] = useState()
  const handleSearch = (Usersearch) => {
    setSearch(Usersearch);
  };

  const handelDelete = () => {

  }

  var affiche = allteacher;
  search ? affiche = search : affiche = allteacher;

  return (
    <div style={{ padding: "5%" }}>
      <Recherche allusers={allteacher} handleSearch={handleSearch}></Recherche>
      <h3>Teacher List</h3>

      <Table responsive>
        <thead>
          <tr>

            {Array.from({ length: 9 }).map((_, index) => (
              <th key={index}>{teacherInfo[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {affiche.map((row, index) => <tr>
            
            <td>{row._id}</td>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.CIN}</td>
            <td>{row.subject}</td>
            <td>{row.phone}</td>
            <td>{row.adresse}</td>
            <td>{row.email}</td>
            {/* <td>
              <ButtonGroup size="sm">
                <Link to= './profile/{row._id}'><Button>See Profile</Button></Link>
              </ButtonGroup>
            </td>
            <td>
              <ButtonGroup size="sm">
                <Link><Button>Message</Button></Link>
              </ButtonGroup>
            </td> */}
          </tr>)}
        </tbody>
      </Table>

    </div>
  )
}

export default AllTeacher
